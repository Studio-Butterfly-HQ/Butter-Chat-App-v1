import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fontsource/inter/index.css"
import './index.css'
import App from './App'
import { Provider } from "react-redux"
import { store, persistor } from "./store"
import { Toaster } from './components/ui/sonner'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from './lib/react-query'
import { PersistGate } from "redux-persist/integration/react"
import { ThemeProvider } from "@/provider/theme-provider"
import { SocketProvider } from "./socket/socket-provider"

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SocketProvider>
              <App />
            </SocketProvider>
            <Toaster />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  // </StrictMode>,
)
