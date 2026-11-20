import { useEffect, useRef, useCallback, useState } from "react";
import { getSocket } from "@/service/socket";

const STUN_CONFIG = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
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
  SCREEN_SHARE_STARTED: "meeting:screenshare-started",
  SCREEN_SHARE_STOPPED: "meeting:screenshare-stopped",
  REQUEST_JOIN:       "meeting:request-join",
  JOIN_REQUEST:       "meeting:join-request",
  ADMIT_USER:         "meeting:admit-user",
  DENY_USER:          "meeting:deny-user",
  ADMITTED:           "meeting:admitted",
  DENIED:             "meeting:denied",
  WAITING_LIST:       "meeting:waiting-list",
};

/**
 * Creates an animated canvas video track if camera is locked by another window
 */
const createDummyVideoTrack = (label = "User") => {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 360;
  const ctx = canvas.getContext("2d");

  const render = () => {
    const now = Date.now();
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#0b132b");
    gradient.addColorStop(1, "#1c2541");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Pulsing glowing circle based on time
    const pulse = 45 + Math.sin(now / 250) * 8;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2 - 25, pulse, 0, Math.PI * 2);
    ctx.fillStyle = "#0080f6";
    ctx.shadowColor = "#0080f6";
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.shadowBlur = 0;

    // User initials
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText((label || "U").slice(0, 2).toUpperCase(), canvas.width / 2, canvas.height / 2 - 25);

    // Label
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = "#e2e8f0";
    ctx.fillText(label || "User", canvas.width / 2, canvas.height / 2 + 45);

    // Live clock timestamp (forces Chrome WebRTC video encoder to stream packets continuously)
    ctx.font = "12px monospace";
    ctx.fillStyle = "#64748b";
    ctx.fillText(`LIVE • ${new Date().toLocaleTimeString()}`, canvas.width / 2, canvas.height / 2 + 75);
  };

  render();
  const intervalId = setInterval(render, 40); // 25 FPS

  const stream = canvas.captureStream(25);
  const track = stream.getVideoTracks()[0];
  if (track) {
    const origStop = track.stop.bind(track);
    track.stop = () => {
      clearInterval(intervalId);
      origStop();
    };
  }
  return track;
};

/**
 * Creates a silent audio track using Web Audio API if microphone is unavailable
 */
const createDummyAudioTrack = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const dst = ctx.createMediaStreamDestination();
    const gain = ctx.createGain();
    gain.gain.value = 0.0001; // virtually silent
    osc.connect(gain);
    gain.connect(dst);
    osc.start();
    return dst.stream.getAudioTracks()[0];
  } catch {
    return null;
  }
};

export const useWebRTC = ({ roomId, userInfo, isTeacher }) => {
  const [localStream, setLocalStream]         = useState(null);
  const [remoteStreams, setRemoteStreams]      = useState({}); // { [socketId]: MediaStream }
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
  const [joinRequests, setJoinRequests]       = useState([]);

  const peerConnections   = useRef({}); // { [socketId]: RTCPeerConnection }
  const pendingCandidates = useRef({}); // { [socketId]: RTCIceCandidate[] }
  const localStreamRef    = useRef(null);
  const screenStreamRef   = useRef(null);
  const mediaRecorderRef  = useRef(null);
  const recordingChunks   = useRef([]);

  // ── Acquire local camera + microphone with auto fallback ────────────────
  const initLocalStream = useCallback(async () => {
    // If local stream already active with live tracks, reuse it without re-acquiring hardware
    if (localStreamRef.current) {
      const live = localStreamRef.current.getTracks().filter((t) => t.readyState === "live");
      if (live.length > 0) {
        return localStreamRef.current;
      }
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" },
        audio: { echoCancellation: true, noiseSuppression: true },
      });
      localStreamRef.current = stream;
      setLocalStream(stream);
      return stream;
    } catch {
      // Camera might be locked by another tab on this PC (e.g. testing teacher & student together)
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const canvasTrack = createDummyVideoTrack(userInfo.name);
        const combined = new MediaStream([canvasTrack, ...audioStream.getAudioTracks()]);
        localStreamRef.current = combined;
        setLocalStream(combined);
        return combined;
      } catch {
        // Full fallback: dummy audio and video
        const canvasTrack = createDummyVideoTrack(userInfo.name);
        const dummyAudio = createDummyAudioTrack();
        const tracks = [canvasTrack];
        if (dummyAudio) tracks.push(dummyAudio);
        const fallbackStream = new MediaStream(tracks);
        localStreamRef.current = fallbackStream;
        setLocalStream(fallbackStream);
        return fallbackStream;
      }
    }
  }, [userInfo.name]);

  // ── Flush queued ICE candidates after remote description is set ────────
  const flushQueuedCandidates = useCallback(async (socketId, pc) => {
    const queue = pendingCandidates.current[socketId] || [];
    pendingCandidates.current[socketId] = [];
    for (const cand of queue) {
      try {
        await pc.addIceCandidate(new RTCIceCandidate(cand));
      } catch (err) {
        console.warn("ICE candidate flush error:", err);
      }
    }
  }, []);

  // ── Create RTCPeerConnection for a remote peer ──────────────────────────
  const createPeerConnection = useCallback((socketId) => {
    if (peerConnections.current[socketId]) return peerConnections.current[socketId];

    const pc = new RTCPeerConnection(STUN_CONFIG);
    peerConnections.current[socketId] = pc;

    // Attach local tracks
    const stream = localStreamRef.current;
    if (stream) {
      stream.getTracks().forEach((track) => {
        try {
          pc.addTrack(track, stream);
        } catch (e) {
          console.warn("Error adding track:", e);
        }
      });
    }

    // Guarantee bidirectional media negotiation even if local track is missing
    const hasAudio = stream && stream.getAudioTracks().length > 0;
    const hasVideo = stream && stream.getVideoTracks().length > 0;
    if (!hasAudio) {
      try { pc.addTransceiver("audio", { direction: "recvonly" }); } catch (_) {}
    }
    if (!hasVideo) {
      try { pc.addTransceiver("video", { direction: "recvonly" }); } catch (_) {}
    }

    // Handle remote track received
    pc.ontrack = (event) => {
      const incomingStream = event.streams?.[0] || new MediaStream([event.track]);
      setRemoteStreams((prev) => {
        const existing = prev[socketId];
        if (existing) {
          if (!existing.getTracks().some((t) => t.id === event.track.id)) {
            existing.addTrack(event.track);
          }
          return { ...prev, [socketId]: existing };
        }
        return { ...prev, [socketId]: incomingStream };
      });
    };

    // Send ICE candidates to the remote peer
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

  // ── Teacher makes WebRTC offer ──────────────────────────────────────────
  const makeOffer = useCallback(async (toSocketId) => {
    try {
      const pc = createPeerConnection(toSocketId);
      if (pc.signalingState !== "stable") {
        console.warn("Peer connection state is not stable, deferring offer:", pc.signalingState);
        return;
      }
      const offer = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      if (pc.signalingState !== "stable") return;
      await pc.setLocalDescription(offer);
      const socket = getSocket();
      socket.emit(MEETING_EVENTS.OFFER, { toSocketId, offer: pc.localDescription, roomId });
    } catch (err) {
      console.error("makeOffer error:", err);
    }
  }, [createPeerConnection, roomId]);

  // ── Toggle microphone ───────────────────────────────────────────────────
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
  const stopScreenShare = useCallback(() => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((t) => t.stop());
      screenStreamRef.current = null;
    }
    const camStream = localStreamRef.current;
    const camVideoTrack = camStream?.getVideoTracks()[0];
    if (camVideoTrack) {
      Object.values(peerConnections.current).forEach((pc) => {
        const sender = pc.getSenders().find((s) => s.track?.kind === "video");
        if (sender) sender.replaceTrack(camVideoTrack).catch(() => {});
      });
      setLocalStream(camStream);
    }
    setIsScreenSharing(false);
    try {
      const socket = getSocket();
      socket.emit(MEETING_EVENTS.SCREEN_SHARE_STOPPED, { roomId });
    } catch (_) {}
  }, [roomId]);

  const toggleScreenShare = useCallback(async () => {
    if (isScreenSharing) {
      stopScreenShare();
    } else {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        screenStreamRef.current = screenStream;
        const screenTrack = screenStream.getVideoTracks()[0];

        // Replace track on all existing connections
        Object.values(peerConnections.current).forEach((pc) => {
          const sender = pc.getSenders().find((s) => s.track?.kind === "video");
          if (sender) {
            sender.replaceTrack(screenTrack).catch(() => {});
          } else {
            pc.addTrack(screenTrack, screenStream);
          }
        });

        // Update local stream to show screen share
        const displayStream = new MediaStream([
          screenTrack,
          ...(localStreamRef.current?.getAudioTracks() ?? []),
        ]);
        setLocalStream(displayStream);
        setIsScreenSharing(true);

        try {
          const socket = getSocket();
          socket.emit(MEETING_EVENTS.SCREEN_SHARE_STARTED, { roomId });
        } catch (_) {}

        screenTrack.onended = () => {
          stopScreenShare();
        };
      } catch (err) {
        console.warn("Screen share cancelled:", err);
      }
    }
  }, [isScreenSharing, stopScreenShare, roomId]);

  // ── Recording (browser MediaRecorder) ──────────────────────────────────
  const startRecording = useCallback(() => {
    const stream = localStreamRef.current;
    if (!stream) return;
    recordingChunks.current = [];

    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : MediaRecorder.isTypeSupported("video/webm")
      ? "video/webm"
      : "video/mp4";

    try {
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });
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

  // ── In-meeting chat ─────────────────────────────────────────────────────
  const sendChat = useCallback((message) => {
    if (!message?.trim()) return;
    const socket = getSocket();
    socket.emit(MEETING_EVENTS.CHAT, { roomId, message, name: userInfo.name });
  }, [roomId, userInfo.name]);

  // ── Teacher: Admit student ──────────────────────────────────────────────
  const admitStudent = useCallback((targetSocketId) => {
    const socket = getSocket();
    socket.emit(MEETING_EVENTS.ADMIT_USER, { roomId, targetSocketId });
    setJoinRequests((prev) => prev.filter((r) => r.socketId !== targetSocketId));
  }, [roomId]);

  // ── Teacher: Deny student ───────────────────────────────────────────────
  const denyStudent = useCallback((targetSocketId) => {
    const socket = getSocket();
    socket.emit(MEETING_EVENTS.DENY_USER, { roomId, targetSocketId });
    setJoinRequests((prev) => prev.filter((r) => r.socketId !== targetSocketId));
  }, [roomId]);

  // ── Teacher: mute / kick ────────────────────────────────────────────────
  const muteUser = useCallback((targetUserId, mute = true) => {
    const socket = getSocket();
    socket.emit(MEETING_EVENTS.MUTE_USER, { roomId, targetUserId, mute });
  }, [roomId]);

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

  const initLocalStreamRef = useRef(initLocalStream);
  const makeOfferRef = useRef(makeOffer);
  const createPeerConnectionRef = useRef(createPeerConnection);
  const flushQueuedCandidatesRef = useRef(flushQueuedCandidates);
  const enterRoomNowRef = useRef(enterRoomNow);
  const leaveRoomRef = useRef(leaveRoom);

  useEffect(() => {
    initLocalStreamRef.current = initLocalStream;
    makeOfferRef.current = makeOffer;
    createPeerConnectionRef.current = createPeerConnection;
    flushQueuedCandidatesRef.current = flushQueuedCandidates;
    enterRoomNowRef.current = enterRoomNow;
    leaveRoomRef.current = leaveRoom;
  });

  // ── Main Socket.io Effect ───────────────────────────────────────────────
  useEffect(() => {
    if (!roomId || !userInfo?.userId) return;

    let mounted = true;
    const socket = getSocket();

    const setup = async () => {
      await initLocalStreamRef.current();
      if (!mounted) return;

      if (isTeacher) {
        // Teacher is host, joins room immediately
        socket.emit(MEETING_EVENTS.JOIN, {
          roomId,
          userId: userInfo.userId,
          name: userInfo.name,
          role: userInfo.role,
        });
      } else {
        // Student enters Waiting Room
        socket.emit(MEETING_EVENTS.REQUEST_JOIN, {
          roomId,
          userId: userInfo.userId,
          name: userInfo.name,
          role: userInfo.role,
        });
      }
    };

    // ── Event Handlers ────────────────────────────────────────────────────
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
      enterRoomNowRef.current();
    };

    const onDenied = () => {
      if (!mounted) return;
      setWaitingToJoin(false);
      setWasDenied(true);
    };

    const onParticipants = (list) => {
      if (!mounted) return;
      setParticipants(list);
      // If teacher, make offer to every other participant
      if (isTeacher) {
        list.forEach(({ socketId }) => {
          if (socketId !== socket.id) {
            setTimeout(() => makeOfferRef.current(socketId), 150);
          }
        });
      }
    };

    const onParticipantJoined = (info) => {
      if (!mounted) return;
      setParticipants((prev) => {
        if (prev.some((p) => p.socketId === info.socketId)) return prev;
        return [...prev, info];
      });
      // Teacher initiates WebRTC connection
      if (isTeacher) {
        setTimeout(() => {
          makeOfferRef.current(info.socketId);
        }, 150);
      }
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

    // ── WebRTC Signaling Offer ───────────────────────────────────────────
    const onOffer = async ({ fromSocketId, offer }) => {
      if (!mounted) return;
      try {
        const pc = createPeerConnectionRef.current(fromSocketId);
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        // Flush any queued ICE candidates that arrived before offer
        await flushQueuedCandidatesRef.current(fromSocketId, pc);

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit(MEETING_EVENTS.ANSWER, { toSocketId: fromSocketId, answer: pc.localDescription });
      } catch (err) {
        console.error("onOffer error:", err);
      }
    };

    // ── WebRTC Signaling Answer ──────────────────────────────────────────
    const onAnswer = async ({ fromSocketId, answer }) => {
      if (!mounted) return;
      try {
        const pc = peerConnections.current[fromSocketId];
        if (pc) {
          await pc.setRemoteDescription(new RTCSessionDescription(answer));
          // Flush any queued ICE candidates
          await flushQueuedCandidatesRef.current(fromSocketId, pc);
        }
      } catch (err) {
        console.error("onAnswer error:", err);
      }
    };

    // ── WebRTC ICE Candidates ────────────────────────────────────────────
    const onIce = async ({ fromSocketId, candidate }) => {
      if (!mounted || !candidate) return;
      const pc = peerConnections.current[fromSocketId];
      if (pc && pc.remoteDescription && pc.remoteDescription.type) {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.warn("ICE error:", err);
        }
      } else {
        // Queue candidate until remote description is set
        if (!pendingCandidates.current[fromSocketId]) {
          pendingCandidates.current[fromSocketId] = [];
        }
        pendingCandidates.current[fromSocketId].push(candidate);
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
      leaveRoomRef.current();
    };

    const onEnded = () => {
      setMeetingEnded(true);
      leaveRoomRef.current();
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

    const onScreenShareStarted = () => {};
    const onScreenShareStopped = () => {};

    const handleReconnect = () => {
      if (!mounted) return;
      if (isTeacher) {
        socket.emit(MEETING_EVENTS.JOIN, {
          roomId,
          userId: userInfo.userId,
          name: userInfo.name,
          role: userInfo.role,
        });
      } else {
        if (!waitingToJoin) {
          socket.emit(MEETING_EVENTS.JOIN, {
            roomId,
            userId: userInfo.userId,
            name: userInfo.name,
            role: userInfo.role,
          });
        } else {
          socket.emit(MEETING_EVENTS.REQUEST_JOIN, {
            roomId,
            userId: userInfo.userId,
            name: userInfo.name,
            role: userInfo.role,
          });
        }
      }
    };

    // Register events
    socket.on("connect",                         handleReconnect);
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
    socket.on(MEETING_EVENTS.SCREEN_SHARE_STARTED, onScreenShareStarted);
    socket.on(MEETING_EVENTS.SCREEN_SHARE_STOPPED, onScreenShareStopped);

    setup();

    return () => {
      mounted = false;
      socket.off("connect",                         handleReconnect);
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
      socket.off(MEETING_EVENTS.SCREEN_SHARE_STARTED, onScreenShareStarted);
      socket.off(MEETING_EVENTS.SCREEN_SHARE_STOPPED, onScreenShareStopped);
      leaveRoomRef.current();
    };
  }, [roomId, userInfo?.userId, isTeacher]);

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
