let socket: WebSocket | null = null;
let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
let reconnectAttempts = 0;
let manualClose = false;

const MAX_RECONNECT_ATTEMPTS = 10;
const BASE_RECONNECT_DELAY_MS = 1000;

let savedToken = "";
let savedOnMessage: ((event: MessageEvent) => void) | null = null;

const scheduleReconnect = () => {
  if (manualClose) return;
  if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
    console.error("Max reconnect attempts reached. Giving up.");
    return;
  }

  const delay = Math.min(BASE_RECONNECT_DELAY_MS * 2 ** reconnectAttempts, 30000);
  reconnectAttempts++;

  console.log(`Reconnecting in ${delay}ms... (attempt ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`);

  reconnectTimeout = setTimeout(() => {
    if (savedToken && savedOnMessage) {
      createSocketConnection(savedToken, savedOnMessage);
    }
  }, delay);
};

export const createSocketConnection = (token: string, onMessage: (event: MessageEvent) => void) => {
  savedToken = token;
  savedOnMessage = onMessage;
  manualClose = false;

  if (socket) {
    console.log("Socket already exists, readyState:", socket.readyState);
    return socket;
  }

  const wsUrl = `wss://socket.studiobutterfly.io/human-agent?token=${token}`;
  //const wsUrl = `ws://localhost:4646/human-agent?token=${token}`;
  
  const customerUrl = `ws://localhost:4646/customer?token=""`

  try {
    socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log("Socket connected successfully!");
      reconnectAttempts = 0;
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
        reconnectTimeout = null;
      }
    };

    socket.onmessage = (event) => {
      console.log("Message received!");
      console.log("Data:", event.data);
      // console.log("Timestamp:", new Date().toISOString());
      onMessage(event);
    };

    socket.onclose = (event) => {
      console.log("Socket disconnected");
      console.log("Close Code:", event.code);
      console.log("Close Reason:", event.reason || "No reason provided");
      console.log("Was Clean:", event.wasClean);
      socket = null;
      scheduleReconnect();
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
    scheduleReconnect();
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
  manualClose = true;

  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }

  if (socket) {
    console.log("Closing socket...");
    console.log("Current ReadyState:", socket.readyState);
    socket.close();
    socket = null;
    console.log("Socket closed and cleared");
  } else {
    console.log("No socket to close");
  }

  reconnectAttempts = 0;
};