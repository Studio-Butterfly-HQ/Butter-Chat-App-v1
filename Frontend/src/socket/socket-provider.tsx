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

    const handleMessage = (event: MessageEvent) => {
      try {
        //const data = JSON.parse(event.data);
        //handleSocketEvent(data);
        console.log(event)
      } catch (error) {
        console.error("Failed to parse socket message:", error);
      }
    };

    const ws = createSocketConnection(token, handleMessage);
    setSocket(ws);

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
