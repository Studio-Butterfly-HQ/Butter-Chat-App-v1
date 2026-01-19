import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fontsource/inter/index.css"
import './index.css'
import App from './App'
import { Provider } from "react-redux"
import { store } from "./store"
import { Toaster } from './components/ui/sonner'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from './lib/react-query'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
