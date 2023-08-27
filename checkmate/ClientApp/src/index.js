import React from 'react';
import { createRoot } from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';

import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './components/store/AuthContext'; // Updated import

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <Router basename={baseUrl}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </Router>
);
