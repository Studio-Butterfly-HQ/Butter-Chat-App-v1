import { createContext, useContext, useEffect, useState } from "react";
import { createSocketConnection, closeSocket } from "./socket";
import { handleSocketEvent } from "./socket-events";
import { useAppSelector } from "@/store/hooks";

const SocketContext = createContext<WebSocket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const token = useAppSelector((state) => state.auth.token);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!token) {
      setSocket(null);
      return;
    }

    const ws = createSocketConnection(token);
    setSocket(ws);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        handleSocketEvent(data);
      } catch (error) {
        console.error("Failed to parse socket message:", error);
      }
    };

    return () => {
      closeSocket();
      setSocket(null);
    };
  }, [token]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
