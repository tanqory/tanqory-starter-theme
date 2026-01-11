import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Initialize Tanqory Editor selection mode when running in iframe
if (window.parent !== window) {
  import('./editor-bridge').catch(() => {
    // Editor bridge not available - ignore
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
