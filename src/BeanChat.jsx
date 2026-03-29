import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import styles from './BeanChat.module.css';

const BeanChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "initial",
      text: "Yo! I'm Bean. Need some menu tips or just wanna vibe?",
      sender: "bean",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const chatBodyRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    // Add User Message
    const userMsg = {
      id: Date.now().toString(),
      text: text,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    // We pass the current messages + the new user message to the API
    const chatHistory = [...messages, userMsg];
    
    setMessages(chatHistory);
    setInputValue("");
    setIsTyping(true);

    try {
      // Hit the secure Netlify serverless function
      const response = await fetch('/api/bean-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: text,
          history: messages // Pass history up to this point
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      const beanMsg = {
        id: (Date.now() + 1).toString(),
        text: data.response || "Sorry, I'm having a little trouble connecting right now.",
        sender: "bean",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev) => [...prev, beanMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        text: "My gears are grinding a bit—mind trying again later? ☕",
        sender: "bean",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionClick = (actionText) => {
    handleSend(actionText);
  };

  return (
    <div className={styles.chatbotContainer}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
            className={styles.chatWindow}
          >
            {/* Header */}
            <div className={styles.chatHeader}>
              <div className={styles.headerInfo}>
                <div className={styles.avatar}>B</div>
                <div>
                  <h3 className="font-bold text-sm">Bean</h3>
                  <p className="text-xs opacity-80 flex items-center">
                    Virtual Barista <span className={styles.statusIndicator}></span>
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:opacity-70 transition-opacity"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className={styles.chatBody} ref={chatBodyRef}>
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`${styles.messageWrapper} ${msg.sender === 'user' ? styles.user : styles.bean}`}
                >
                  <div className={styles.messageBubble}>
                    {msg.text}
                  </div>
                  <span className={styles.timestamp}>{msg.timestamp}</span>
                </div>
              ))}
              
              {isTyping && (
                <div className={styles.typingIndicator}>
                  <div className={styles.dot}></div>
                  <div className={styles.dot}></div>
                  <div className={styles.dot}></div>
                </div>
              )}
              
              {/* Suggested Actions - only show if last message was from bean and no typing */}
              {!isTyping && messages[messages.length - 1].sender === 'bean' && (
                <div className={styles.suggestedActions}>
                  <button className={styles.actionChip} onClick={() => handleActionClick("What's on the menu?")}>
                    Menu Tips
                  </button>
                  <button className={styles.actionChip} onClick={() => handleActionClick("What are your hours?")}>
                    Opening Hours
                  </button>
                  <button className={styles.actionChip} onClick={() => handleActionClick("What's the vibe here?")}>
                    Our Vibe
                  </button>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className={styles.chatFooter}>
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSend(inputValue);
                  }
                }}
                placeholder="Ask Bean anything..."
                className={styles.inputField}
              />
              <button 
                disabled={!inputValue.trim() || isTyping}
                onClick={() => handleSend(inputValue)}
                className={styles.sendBtn}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={styles.chatToggleBtn}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
};

export default BeanChat;
