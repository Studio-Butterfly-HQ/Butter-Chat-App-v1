let socket: WebSocket | null = null;
export const createSocketConnection = (token: string) => {
  if (socket) return socket;

  socket = new WebSocket(`ws://localhost:4646/?token=${token}`);

  socket.onopen = () => {
    console.log("Socket connected");
  };

  socket.onclose = () => {
    console.log("Socket disconnected");
    socket = null;
  };

  socket.onerror = (err) => {
    console.error("Socket error:", err);
  };

  return socket;
};

export const getSocket = () => socket;

export const closeSocket = () => {
  socket?.close();
  socket = null;
};
