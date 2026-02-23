import React, { createContext, useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Loader } from 'lucide-react';
import { supabase } from './supabaseClient'; // <--- 1. Import Supabase

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: '', subtitle: '', type: 'default' });
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false); // New loading state
  const [isSubmitted, setIsSubmitted] = useState(false);

  const openModal = (title, subtitle, type = 'default') => {
    setModalData({ title, subtitle, type });
    setFormData({ name: '', email: '' }); // Clear form on open
    setIsSubmitted(false);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- THE REAL SUBMISSION LOGIC ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 2. Send to Supabase
      const { error } = await supabase
        .from('signups')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            type: modalData.type 
          }
        ]);

      if (error) throw error;

      // Success!
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Auto close after 2 seconds
      setTimeout(() => {
        closeModal();
      }, 2000);

    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Something went wrong. Check the console.");
      setIsSubmitting(false);
    }
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-primary-cream/80 backdrop-blur-sm cursor-pointer"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-secondary-charcoal border border-gray-700 w-full max-w-md p-8 rounded-xl shadow-2xl overflow-hidden"
            >
              
              <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-primary-brown">
                <X size={24} />
              </button>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} 
                    className="inline-block text-green-500 mb-4"
                  >
                    <CheckCircle size={64} />
                  </motion.div>
                  <h3 className="text-2xl font-heading text-primary-brown mb-2">Received!</h3>
                  <p className="text-gray-500">We'll see you at Base Camp.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-3xl font-heading text-accent-gold mb-2">{modalData.title}</h2>
                  <p className="text-gray-500 mb-6 text-sm">{modalData.subtitle}</p>

                  <div className="space-y-4">
                    <input 
                      name="name"
                      type="text" 
                      placeholder="Your Name" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-primary-cream/30 border border-gray-700 rounded p-3 text-primary-brown focus:border-accent-gold outline-none transition-colors"
                    />
                    <input 
                      name="email"
                      type="email" 
                      placeholder="Email Address" 
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-primary-cream/30 border border-gray-700 rounded p-3 text-primary-brown focus:border-accent-gold outline-none transition-colors"
                    />
                    
                    {modalData.type === 'ticket' && (
                       <select className="w-full bg-primary-cream/30 border border-gray-700 rounded p-3 text-primary-brown outline-none">
                         <option>1 Ticket</option>
                         <option>2 Tickets</option>
                         <option>Group (5+)</option>
                       </select>
                    )}

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-accent-rust hover:bg-orange-700 text-primary-brown font-bold py-3 rounded mt-4 transition-colors flex justify-center items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        "CONFIRM"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};