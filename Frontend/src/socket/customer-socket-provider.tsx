import { createContext, useContext, useEffect, useState } from "react";
import {
  createCustomerSocketConnection,
  closeCustomerSocket,
} from "./customer-socket";
import { handleCustomerSocketEvent } from "./customer-socket-events";
import { useAppSelector } from "@/store/hooks";
import { useSocketParser } from "@/hooks/use-socket-parser";

const CustomerSocketContext = createContext<WebSocket | null>(null);

export const CustomerSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const token = useAppSelector((state) => state.customerAuth.token);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { parseMultipleJSON } = useSocketParser();

  useEffect(() => {
    if (!token) {
      setSocket(null);
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      const messages = parseMultipleJSON(event.data);
      messages.forEach((msg) => handleCustomerSocketEvent(msg));
    };

    const ws = createCustomerSocketConnection(token, handleMessage);
    setSocket(ws);

    return () => {
      closeCustomerSocket();
      setSocket(null);
    };
  }, [token]);

  return (
    <CustomerSocketContext.Provider value={socket}>
      {children}
    </CustomerSocketContext.Provider>
  );
};

export const useCustomerSocket = () => useContext(CustomerSocketContext);
