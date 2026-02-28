import { createContext, useContext, useEffect, useState } from "react";
import { createSocketConnection, closeSocket } from "./socket";
import { handleSocketEvent } from "./socket-events";
import { useAppSelector } from "@/store/hooks";
import { useSocketParser } from "@/hooks/use-socket-parser";

const SocketContext = createContext<WebSocket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const token = useAppSelector((state) => state.auth.token);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { parseMultipleJSON } = useSocketParser();

  useEffect(() => {
    if (!token) {
      setSocket(null);
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      const messages = parseMultipleJSON(event.data);
      messages.forEach((msg) => handleSocketEvent(msg));
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
