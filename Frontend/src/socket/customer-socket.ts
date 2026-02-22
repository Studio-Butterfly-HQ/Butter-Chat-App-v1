import { MAX_RECONNECT_ATTEMPTS, BASE_RECONNECT_DELAY_MS } from "@/constants";

let socket: WebSocket | null = null;
let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
let reconnectAttempts = 0;
let manualClose = false;

let savedToken = "";
let savedOnMessage: ((event: MessageEvent) => void) | null = null;

const retryConnection = () => {
  socket = null;
  const delay = Math.min(
    BASE_RECONNECT_DELAY_MS * 2 ** reconnectAttempts,
    30000,
  );
  reconnectAttempts++;

  console.log(
    `[Customer] Reconnecting in ${delay}ms (attempt ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`,
  );

  reconnectTimeout = setTimeout(() => {
    if (savedToken && savedOnMessage) {
      createCustomerSocketConnection(savedToken, savedOnMessage);
    }
  }, delay);
};

const scheduleReconnect = () => {
  if (manualClose) return;
  if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
    console.error("[Customer] Max reconnect attempts reached. Giving up.");
    return;
  }

  retryConnection();
};

export const createCustomerSocketConnection = (token: string, onMessage: (event: MessageEvent) => void) => {
  savedToken = token;
  savedOnMessage = onMessage;
  manualClose = false;

  if (socket) {
    console.log(
      "[Customer] Socket already exists, readyState:",
      socket.readyState,
    );
    return socket;
  }

  const wsUrl = `wss://socket.studiobutterfly.io/customer?token=${token}`;

  try {
    socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log("[Customer] Socket connected successfully!");
      reconnectAttempts = 0;
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
        reconnectTimeout = null;
      }
    };

    socket.onmessage = (event) => {
      console.log("[Customer] Message received!", event);
      onMessage(event);
    };

    socket.onclose = (event) => {
      console.log("[Customer] Socket disconnected");
      scheduleReconnect();
    };

    socket.onerror = (err) => {
      console.error("[Customer] Socket error occurred!", err);
    };
  } catch (error) {
    console.error("[Customer] Failed to create WebSocket:", error);
    scheduleReconnect();
  }

  return socket;
};

export const getCustomerSocket = () => {
  return socket;
};

export const closeCustomerSocket = () => {
  manualClose = true;

  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }

  if (socket) {
    console.log("[Customer] Closing socket...");
    socket.close();
    socket = null;
  }

  reconnectAttempts = 0;
};
