import { useEffect, useRef, useCallback, useState } from "react";
import { getSocket } from "@/service/socket";

const STUN_CONFIG = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};

const MEETING_EVENTS = {
  JOIN:               "meeting:join",
  LEAVE:              "meeting:leave",
  OFFER:              "meeting:offer",
  ANSWER:             "meeting:answer",
  ICE:                "meeting:ice",
  PARTICIPANT_JOINED: "meeting:participant-joined",
  PARTICIPANT_LEFT:   "meeting:participant-left",
  PARTICIPANTS:       "meeting:participants",
  MUTE_USER:          "meeting:mute-user",
  KICK_USER:          "meeting:kick-user",
  RAISE_HAND:         "meeting:raise-hand",
  LOWER_HAND:         "meeting:lower-hand",
  CHAT:               "meeting:chat",
  ENDED:              "meeting:ended",
  RECORDING_STARTED:  "meeting:recording-started",
  RECORDING_STOPPED:  "meeting:recording-stopped",
  REQUEST_JOIN:       "meeting:request-join",
  JOIN_REQUEST:       "meeting:join-request",
  ADMIT_USER:         "meeting:admit-user",
  DENY_USER:          "meeting:deny-user",
  ADMITTED:           "meeting:admitted",
  DENIED:             "meeting:denied",
  WAITING_LIST:       "meeting:waiting-list",
};

/**
 * Core WebRTC hook — manages peer connections, local/remote streams, ICE, offers/answers,
 * plus student waiting room (knock-knock) and teacher admit/deny host controls.
 *
 * @param {string}  roomId      - The lecture/room ID
 * @param {object}  userInfo    - { userId, name, role }
 * @param {boolean} isTeacher   - Whether the current user is the teacher
 * @returns WebRTC state and controls
 */
export const useWebRTC = ({ roomId, userInfo, isTeacher }) => {
  const [localStream, setLocalStream]         = useState(null);
  const [remoteStreams, setRemoteStreams]      = useState({}); // { socketId: MediaStream }
  const [participants, setParticipants]       = useState([]); // from server
  const [chatMessages, setChatMessages]       = useState([]);
  const [isAudioOn, setIsAudioOn]             = useState(true);
  const [isVideoOn, setIsVideoOn]             = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording]         = useState(false);
  const [handRaised, setHandRaised]           = useState(false);
  const [isKicked, setIsKicked]               = useState(false);
  const [meetingEnded, setMeetingEnded]       = useState(false);
  const [error, setError]                     = useState(null);

  // ── Waiting Room State ──────────────────────────────────────────────────
  const [waitingToJoin, setWaitingToJoin]     = useState(!isTeacher);
  const [wasDenied, setWasDenied]             = useState(false);
  const [joinRequests, setJoinRequests]       = useState([]); // For teacher

  const peerConnections  = useRef({}); // { socketId: RTCPeerConnection }
  const localStreamRef   = useRef(null);
  const screenStreamRef  = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordingChunks  = useRef([]);

  // ── Get local camera + mic ──────────────────────────────────────────────
  const initLocalStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;
      setLocalStream(stream);
      return stream;
    } catch {
      try {
        const audioOnly = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
        localStreamRef.current = audioOnly;
        setLocalStream(audioOnly);
        setIsVideoOn(false);
        return audioOnly;
      } catch {
        setError("Could not access camera or microphone. Please check permissions.");
        return null;
      }
    }
  }, []);

  // ── Create a peer connection for a remote participant ───────────────────
  const createPeerConnection = useCallback((socketId) => {
    if (peerConnections.current[socketId]) return peerConnections.current[socketId];

    const pc = new RTCPeerConnection(STUN_CONFIG);
    peerConnections.current[socketId] = pc;

    // Add local tracks
    const stream = localStreamRef.current;
    if (stream) {
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));
    }

    // On remote track → add to remoteStreams
    pc.ontrack = (event) => {
      const [remoteStream] = event.streams;
      setRemoteStreams((prev) => ({ ...prev, [socketId]: remoteStream }));
    };

    // Send ICE candidates to the peer via socket
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        const socket = getSocket();
        socket.emit(MEETING_EVENTS.ICE, { toSocketId: socketId, candidate: event.candidate });
      }
    };

    pc.onconnectionstatechange = () => {
      if (["failed", "disconnected", "closed"].includes(pc.connectionState)) {
        setRemoteStreams((prev) => {
          const next = { ...prev };
          delete next[socketId];
          return next;
        });
      }
    };

    return pc;
  }, []);

  // ── Initiate offer to a new participant (called when they join) ─────────
  const makeOffer = useCallback(async (toSocketId) => {
    const pc = createPeerConnection(toSocketId);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    const socket = getSocket();
    socket.emit(MEETING_EVENTS.OFFER, { toSocketId, offer: pc.localDescription, roomId });
  }, [createPeerConnection, roomId]);

  // ── Toggle mic ──────────────────────────────────────────────────────────
  const toggleAudio = useCallback(() => {
    const stream = localStreamRef.current;
    if (!stream) return;
    stream.getAudioTracks().forEach((t) => { t.enabled = !t.enabled; });
    setIsAudioOn((prev) => !prev);
  }, []);

  // ── Toggle camera ───────────────────────────────────────────────────────
  const toggleVideo = useCallback(() => {
    const stream = localStreamRef.current;
    if (!stream) return;
    stream.getVideoTracks().forEach((t) => { t.enabled = !t.enabled; });
    setIsVideoOn((prev) => !prev);
  }, []);

  // ── Screen sharing ──────────────────────────────────────────────────────
  const toggleScreenShare = useCallback(async () => {
    if (isScreenSharing) {
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((t) => t.stop());
        screenStreamRef.current = null;
      }
      const camStream = localStreamRef.current;
      const camVideoTrack = camStream?.getVideoTracks()[0];
      if (camVideoTrack) {
        Object.values(peerConnections.current).forEach((pc) => {
          const sender = pc.getSenders().find((s) => s.track?.kind === "video");
          if (sender) sender.replaceTrack(camVideoTrack);
        });
        setLocalStream(camStream);
      }
      setIsScreenSharing(false);
    } else {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
        screenStreamRef.current = screenStream;
        const screenTrack = screenStream.getVideoTracks()[0];

        Object.values(peerConnections.current).forEach((pc) => {
          const sender = pc.getSenders().find((s) => s.track?.kind === "video");
          if (sender) sender.replaceTrack(screenTrack);
        });

        const displayStream = new MediaStream([
          screenTrack,
          ...(localStreamRef.current?.getAudioTracks() ?? []),
        ]);
        setLocalStream(displayStream);
        setIsScreenSharing(true);

        screenTrack.onended = () => toggleScreenShare();
      } catch {
        // User cancelled screen share
      }
    }
  }, [isScreenSharing]);

  // ── Recording (browser MediaRecorder) ──────────────────────────────────
  const startRecording = useCallback(() => {
    const stream = localStreamRef.current;
    if (!stream) return;
    recordingChunks.current = [];

    const combinedStream = new MediaStream([
      ...stream.getVideoTracks(),
      ...stream.getAudioTracks(),
    ]);

    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : MediaRecorder.isTypeSupported("video/webm")
      ? "video/webm"
      : "video/mp4";

    try {
      mediaRecorderRef.current = new MediaRecorder(combinedStream, { mimeType });
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) recordingChunks.current.push(e.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordingChunks.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `KIP-Class-${roomId}-${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.webm`;
        a.click();
        URL.revokeObjectURL(url);
      };
      mediaRecorderRef.current.start(1000);
      setIsRecording(true);

      const socket = getSocket();
      socket.emit(MEETING_EVENTS.RECORDING_STARTED, { roomId });
    } catch (e) {
      console.error("Recording failed:", e);
    }
  }, [roomId]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    const socket = getSocket();
    socket.emit(MEETING_EVENTS.RECORDING_STOPPED, { roomId });
  }, [roomId]);

  // ── Raise / Lower hand ──────────────────────────────────────────────────
  const toggleHand = useCallback(() => {
    const socket = getSocket();
    if (handRaised) {
      socket.emit(MEETING_EVENTS.LOWER_HAND, { roomId });
      setHandRaised(false);
    } else {
      socket.emit(MEETING_EVENTS.RAISE_HAND, { roomId });
      setHandRaised(true);
    }
  }, [handRaised, roomId]);

  // ── Send chat message ───────────────────────────────────────────────────
  const sendChat = useCallback((message) => {
    if (!message?.trim()) return;
    const socket = getSocket();
    socket.emit(MEETING_EVENTS.CHAT, { roomId, message, name: userInfo.name });
  }, [roomId, userInfo.name]);

  // ── Teacher: Admit / Deny waiting student ───────────────────────────────
  const admitStudent = useCallback((targetSocketId) => {
    const socket = getSocket();
    socket.emit(MEETING_EVENTS.ADMIT_USER, { roomId, targetSocketId });
    setJoinRequests((prev) => prev.filter((r) => r.socketId !== targetSocketId));
  }, [roomId]);

  const denyStudent = useCallback((targetSocketId) => {
    const socket = getSocket();
    socket.emit(MEETING_EVENTS.DENY_USER, { roomId, targetSocketId });
    setJoinRequests((prev) => prev.filter((r) => r.socketId !== targetSocketId));
  }, [roomId]);

  // ── Teacher: mute a user ────────────────────────────────────────────────
  const muteUser = useCallback((targetUserId, mute = true) => {
    const socket = getSocket();
    socket.emit(MEETING_EVENTS.MUTE_USER, { roomId, targetUserId, mute });
  }, [roomId]);

  // ── Teacher: kick a user ────────────────────────────────────────────────
  const kickUser = useCallback((targetSocketId) => {
    const socket = getSocket();
    socket.emit(MEETING_EVENTS.KICK_USER, { roomId, targetSocketId });
  }, [roomId]);

  // ── Leave meeting ───────────────────────────────────────────────────────
  const leaveRoom = useCallback(() => {
    if (isRecording) stopRecording();
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((t) => t.stop());
    }
    localStreamRef.current?.getTracks().forEach((t) => t.stop());

    Object.values(peerConnections.current).forEach((pc) => pc.close());
    peerConnections.current = {};

    const socket = getSocket();
    socket.emit(MEETING_EVENTS.LEAVE, { roomId });
  }, [roomId, isRecording, stopRecording]);

  // ── Teacher: end class for everyone ────────────────────────────────────
  const endMeeting = useCallback(() => {
    if (isRecording) stopRecording();
    const socket = getSocket();
    socket.emit(MEETING_EVENTS.ENDED, { roomId });
    leaveRoom();
    setMeetingEnded(true);
  }, [roomId, isRecording, stopRecording, leaveRoom]);

  // ── Enter Room directly after being admitted ───────────────────────────
  const enterRoomNow = useCallback(async () => {
    const socket = getSocket();
    socket.emit(MEETING_EVENTS.JOIN, {
      roomId,
      userId: userInfo.userId,
      name: userInfo.name,
      role: userInfo.role,
    });
  }, [roomId, userInfo]);

  // ── Main Socket.io effect ───────────────────────────────────────────────
  useEffect(() => {
    if (!roomId || !userInfo?.userId) return;

    let mounted = true;
    const socket = getSocket();

    const setup = async () => {
      await initLocalStream();
      if (!mounted) return;

      if (isTeacher) {
        // Teacher is the host, enters immediately
        socket.emit(MEETING_EVENTS.JOIN, {
          roomId,
          userId: userInfo.userId,
          name: userInfo.name,
          role: userInfo.role,
        });
      } else {
        // Student requests to join (Waiting Room)
        socket.emit(MEETING_EVENTS.REQUEST_JOIN, {
          roomId,
          userId: userInfo.userId,
          name: userInfo.name,
          role: userInfo.role,
        });
      }
    };

    // ── Event Handlers ──────────────────────────────────────────────────
    const onJoinRequest = (req) => {
      if (!mounted || !isTeacher) return;
      setJoinRequests((prev) => {
        if (prev.some((r) => r.socketId === req.socketId)) return prev;
        return [...prev, req];
      });
    };

    const onWaitingList = (list) => {
      if (!mounted || !isTeacher) return;
      setJoinRequests(list || []);
    };

    const onAdmitted = () => {
      if (!mounted) return;
      setWaitingToJoin(false);
      setWasDenied(false);
      enterRoomNow();
    };

    const onDenied = () => {
      if (!mounted) return;
      setWaitingToJoin(false);
      setWasDenied(true);
    };

    const onParticipants = (list) => {
      if (!mounted) return;
      setParticipants(list);
      if (isTeacher) {
        list.forEach(({ socketId }) => {
          if (socketId !== socket.id) makeOffer(socketId);
        });
      }
    };

    const onParticipantJoined = (info) => {
      if (!mounted) return;
      setParticipants((prev) => {
        if (prev.some((p) => p.socketId === info.socketId)) return prev;
        return [...prev, info];
      });
      if (isTeacher) makeOffer(info.socketId);
    };

    const onParticipantLeft = ({ socketId }) => {
      if (!mounted) return;
      setParticipants((prev) => prev.filter((p) => p.socketId !== socketId));
      setRemoteStreams((prev) => {
        const next = { ...prev };
        delete next[socketId];
        return next;
      });
      if (peerConnections.current[socketId]) {
        peerConnections.current[socketId].close();
        delete peerConnections.current[socketId];
      }
    };

    const onOffer = async ({ fromSocketId, offer }) => {
      if (!mounted) return;
      const pc = createPeerConnection(fromSocketId);
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit(MEETING_EVENTS.ANSWER, { toSocketId: fromSocketId, answer: pc.localDescription });
    };

    const onAnswer = async ({ fromSocketId, answer }) => {
      if (!mounted) return;
      const pc = peerConnections.current[fromSocketId];
      if (pc) await pc.setRemoteDescription(new RTCSessionDescription(answer));
    };

    const onIce = async ({ fromSocketId, candidate }) => {
      if (!mounted) return;
      const pc = peerConnections.current[fromSocketId];
      if (pc && candidate) {
        try { await pc.addIceCandidate(new RTCIceCandidate(candidate)); } catch {}
      }
    };

    const onMuted = ({ mute }) => {
      const stream = localStreamRef.current;
      if (!stream) return;
      stream.getAudioTracks().forEach((t) => { t.enabled = !mute; });
      setIsAudioOn(!mute);
    };

    const onKicked = () => {
      setIsKicked(true);
      leaveRoom();
    };

    const onEnded = () => {
      setMeetingEnded(true);
      leaveRoom();
    };

    const onChat = (msg) => {
      if (!mounted) return;
      setChatMessages((prev) => [...prev, msg]);
    };

    const onRaiseHand = ({ socketId }) => {
      setParticipants((prev) =>
        prev.map((p) => p.socketId === socketId ? { ...p, handRaised: true } : p)
      );
    };

    const onLowerHand = ({ socketId }) => {
      setParticipants((prev) =>
        prev.map((p) => p.socketId === socketId ? { ...p, handRaised: false } : p)
      );
    };

    // Register events
    socket.on(MEETING_EVENTS.JOIN_REQUEST,       onJoinRequest);
    socket.on(MEETING_EVENTS.WAITING_LIST,       onWaitingList);
    socket.on(MEETING_EVENTS.ADMITTED,           onAdmitted);
    socket.on(MEETING_EVENTS.DENIED,             onDenied);
    socket.on(MEETING_EVENTS.PARTICIPANTS,       onParticipants);
    socket.on(MEETING_EVENTS.PARTICIPANT_JOINED, onParticipantJoined);
    socket.on(MEETING_EVENTS.PARTICIPANT_LEFT,   onParticipantLeft);
    socket.on(MEETING_EVENTS.OFFER,              onOffer);
    socket.on(MEETING_EVENTS.ANSWER,             onAnswer);
    socket.on(MEETING_EVENTS.ICE,                onIce);
    socket.on(MEETING_EVENTS.MUTE_USER,          onMuted);
    socket.on(MEETING_EVENTS.KICK_USER,          onKicked);
    socket.on(MEETING_EVENTS.ENDED,              onEnded);
    socket.on(MEETING_EVENTS.CHAT,               onChat);
    socket.on(MEETING_EVENTS.RAISE_HAND,         onRaiseHand);
    socket.on(MEETING_EVENTS.LOWER_HAND,         onLowerHand);

    setup();

    return () => {
      mounted = false;
      socket.off(MEETING_EVENTS.JOIN_REQUEST,       onJoinRequest);
      socket.off(MEETING_EVENTS.WAITING_LIST,       onWaitingList);
      socket.off(MEETING_EVENTS.ADMITTED,           onAdmitted);
      socket.off(MEETING_EVENTS.DENIED,             onDenied);
      socket.off(MEETING_EVENTS.PARTICIPANTS,       onParticipants);
      socket.off(MEETING_EVENTS.PARTICIPANT_JOINED, onParticipantJoined);
      socket.off(MEETING_EVENTS.PARTICIPANT_LEFT,   onParticipantLeft);
      socket.off(MEETING_EVENTS.OFFER,              onOffer);
      socket.off(MEETING_EVENTS.ANSWER,             onAnswer);
      socket.off(MEETING_EVENTS.ICE,                onIce);
      socket.off(MEETING_EVENTS.MUTE_USER,          onMuted);
      socket.off(MEETING_EVENTS.KICK_USER,          onKicked);
      socket.off(MEETING_EVENTS.ENDED,              onEnded);
      socket.off(MEETING_EVENTS.CHAT,               onChat);
      socket.off(MEETING_EVENTS.RAISE_HAND,         onRaiseHand);
      socket.off(MEETING_EVENTS.LOWER_HAND,         onLowerHand);
      leaveRoom();
    };
  }, [roomId, userInfo?.userId, isTeacher, initLocalStream, makeOffer, createPeerConnection, enterRoomNow, leaveRoom]);

  return {
    // State
    localStream, remoteStreams, participants,
    chatMessages, isAudioOn, isVideoOn,
    isScreenSharing, isRecording, handRaised,
    isKicked, meetingEnded, error,
    // Waiting Room
    waitingToJoin, wasDenied, joinRequests,
    admitStudent, denyStudent,
    // Controls
    toggleAudio, toggleVideo, toggleScreenShare,
    startRecording, stopRecording,
    toggleHand, sendChat,
    muteUser, kickUser,
    leaveRoom, endMeeting,
  };
};

export default useWebRTC;
