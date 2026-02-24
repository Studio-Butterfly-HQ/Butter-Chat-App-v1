import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageSquare, ShoppingBag, Lightbulb } from "lucide-react";

export interface Notification {
  id: string;
  title: string;
  description?: string;
  time: string;
  type: "transfer" | "message" | "info";
  isRead: boolean;
}

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, "isRead">>) => {
      state.notifications.unshift({
        ...action.payload,
        isRead: false,
      });
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find((n) => n.id === action.payload);
      if (notification) {
        notification.isRead = true;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((n) => {
        n.isRead = true;
      });
    },
    clearAll: (state) => {
      state.notifications = [];
    },
  },
});

export const { addNotification, markAsRead, markAllAsRead, clearAll } =
  notificationSlice.actions;
export default notificationSlice.reducer;
