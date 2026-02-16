export type SocketEventType =
  | "butter_chat"
  | "butter_typing_start"
  | "butter_stream"
  | "butter_typing_end"
  | "transfer_chat"
  | "accept_chat"
  | "message"
  | "end_chat"
  | "connection_established";
export interface SocketMessage<T = any> {
  type: SocketEventType;
  payload: T;
}
