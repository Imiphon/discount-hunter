import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';  // Import der App-Komponente
import './style.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);  // Rendern der App-Komponente

