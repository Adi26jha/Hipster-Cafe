// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ModalProvider } from './ModalContext';
import Preloader from './Preloader';

// 2. Import Pages
import Home from './Home';
import Admin from './Admin';
import Login from './Login'; // <--- New Import
import UserDashboard from './UserDashboard'; // <--- New Import
import BeanChat from './BeanChat';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Keep your loading screen logic
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    // Keep the ModalProvider so popups work on the website
    <ModalProvider>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="loader" />}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Global Bean Chatbot */}
          <BeanChat />
          
          {/* 3. The Router wraps the whole application */}
          <Router>
            <Routes>
              {/* Main Public Website */}
              <Route path="/" element={<Home />} />

              {/* Admin Panel (Owner Only) */}
              <Route path="/admin" element={<Admin />} />

              {/* User Auth & Profile (Community Features) */}
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<UserDashboard />} />
            </Routes>
          </Router>
        </>
      )}
    </ModalProvider>
  );
}

export default App;