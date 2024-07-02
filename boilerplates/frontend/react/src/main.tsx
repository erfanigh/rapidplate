import ReactDOM from 'react-dom/client';
import React from 'react';
import Router from './router';
import './assets/styles/index.css';
import './assets/styles/tailwind.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>,
)