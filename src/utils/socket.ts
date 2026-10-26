import { io, Socket } from 'socket.io-client';

// Detect default socket URL based on environment and current hostname
function getSocketUrl(): string {
  // 1. Explicit env variable (useful for separate frontend/backend deployments)
  if (import.meta.env.VITE_SOCKET_URL) {
    return import.meta.env.VITE_SOCKET_URL;
  }

  if (typeof window !== 'undefined') {
    // 2. In local dev with Vite on port 3000, backend is on port 3001
    if (window.location.port === '3000') {
      const hostname = window.location.hostname || 'localhost';
      return `http://${hostname}:3001`;
    }
    // 3. In production (Render, VPS, Docker, single-port serve): use current origin
    return window.location.origin;
  }
  return 'http://localhost:3001';
}

export const socket: Socket = io(getSocketUrl(), {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});

socket.on('connect', () => {
  console.log('[Socket.IO Client] Connected to server, ID:', socket.id);
});

socket.on('disconnect', () => {
  console.log('[Socket.IO Client] Disconnected from server');
});
