/// <reference types="vite/client" />

declare global {
  interface Window {
    WebSocket: CustomWebSocket
  }
}
