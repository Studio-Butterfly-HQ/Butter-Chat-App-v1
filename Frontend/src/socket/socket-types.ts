export type SocketEventType =
  | "transfer_chat"
  | "accept_chat"
  | "message"
  | "end_chat"
  | "connection_established";
export interface SocketMessage<T = any> {
  type: SocketEventType;
  payload: T;
}
