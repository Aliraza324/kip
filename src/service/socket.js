import { io } from "socket.io-client";
import { BASE_URL } from "./baseURL";

// Remove /api/v1 suffix to get the socket root host (e.g. http://localhost:5000)
export const SOCKET_URL = BASE_URL.replace(/\/api\/v1\/?$/, "");

let socketInstance = null;

export const getSocket = () => {
  if (!socketInstance) {
    socketInstance = io(SOCKET_URL, {
      autoConnect: true,
      withCredentials: true,
      transports: ["websocket", "polling"],
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
    });

    socketInstance.on("connect", () => {
      console.log("⚡ Socket.io connected to server:", socketInstance.id);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("⚡ Socket.io disconnected:", reason);
    });

    socketInstance.on("connect_error", (err) => {
      console.warn("⚡ Socket.io connection error:", err.message);
    });
  }
  return socketInstance;
};

export const joinSocketRoom = ({ userId, role = "admin" } = {}) => {
  const s = getSocket();
  if (s.connected) {
    s.emit("join", { userId, role });
  } else {
    s.once("connect", () => {
      s.emit("join", { userId, role });
    });
  }
};

export const disconnectSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};

export default getSocket;
