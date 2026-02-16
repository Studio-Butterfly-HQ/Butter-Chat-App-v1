import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/auth-slice";
import uiReducer from "./slices/ui/ui-slice";
import chatReducer from "./slices/chat/chat-slice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

// Combine reducers
const appReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  chat: chatReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "auth/logout") {
    // Reset state to undefined to trigger initialState in all reducers
    state = undefined;
  }
  return appReducer(state, action);
};

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "ui"], //persist auth and ui slices
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
