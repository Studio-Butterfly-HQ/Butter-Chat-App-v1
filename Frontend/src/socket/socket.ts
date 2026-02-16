let socket: WebSocket | null = null;

export const createSocketConnection = (
  token: string,
  onMessage: (event: MessageEvent) => void
) => {
  if (socket) {
    console.log("Socket already exists, readyState:", socket.readyState);
    return socket;
  }

  const wsUrl = `wss://socket.studiobutterfly.io/human-agent?token=${token}`;
  //const wsUrl = `ws://localhost:4646/human-agent?token=${token}`;
  
  const customerUrl = `ws://localhost:4646/customer?token=""`
  
  console.log("Creating new WebSocket connection...");
  console.log("URL:", wsUrl);

  try {
    socket = new WebSocket(wsUrl);
    console.log("WebSocket object created, readyState:", socket.readyState);

    socket.onopen = () => {
      console.log("Socket connected successfully!");
      console.log("ReadyState:", socket?.readyState);
      console.log("Protocol:", socket?.protocol);
      console.log("URL:", socket?.url);
    };

    socket.onmessage = (event) => {
      console.log("Message received!");
      console.log("Data:", event.data);
      console.log("Timestamp:", new Date().toISOString());
      onMessage(event);
    };

    socket.onclose = (event) => {
      console.log("Socket disconnected");
      console.log("Close Code:", event.code);
      console.log("Close Reason:", event.reason || "No reason provided");
      console.log("Was Clean:", event.wasClean);
      socket = null;
    };

    socket.onerror = (err) => {
      console.error("Socket error occurred!");
      console.error("Error object:", err);
      console.error("ReadyState at error:", socket?.readyState);
      console.error("URL:", socket?.url);
    };

  } catch (error) {
    console.error("Failed to create WebSocket:");
    console.error(error);
    socket = null;
  }

  return socket;
};

export const getSocket = () => {
  if (socket) {
    console.log("Getting socket - ReadyState:", socket.readyState);
  } else {
    console.log("No active socket connection");
  }
  return socket;
};

export const closeSocket = () => {
  if (socket) {
    console.log("Closing socket...");
    console.log("Current ReadyState:", socket.readyState);
    socket.close();
    socket = null;
    console.log("Socket closed and cleared");
  } else {
    console.log("No socket to close");
  }
};