import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, ArrowLeft, Mountain, Mail, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient'; // <--- IMPORT SUPABASE

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  // 1. REAL AUTHENTICATION LOGIC
  const executeLogin = async () => {
    // Validation
    if (!formData.email || !formData.password) {
      alert("Please enter your details.");
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        // --- SIGN UP LOGIC ---
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name,
              avatar_url: '' 
            }
          }
        });

        if (error) throw error;
        
        alert("Account created! Check your email for verification, or log in if auto-confirmed.");
        // Usually Supabase requires email verification, but if disabled, it logs in immediately
        if (data.session) navigate('/dashboard');
        
      } else {
        // --- LOGIN LOGIC ---
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        // Success! Navigate to dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. KEYBOARD SUPPORT
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeLogin();
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-body cursor-default">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2664&auto=format&fit=crop" 
          alt="Mountain Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-nature-dark/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* LOGIN BOX */}
      <motion.div 
        layout 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md p-8 md:p-12 mx-4"
      >
        <div className="absolute inset-0 bg-nature-dark/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl" />
        
        <div className="relative z-20 flex flex-col items-center">
          
          <motion.div 
            layout
            className="w-16 h-16 bg-energy-yellow rounded-full flex items-center justify-center text-nature-dark mb-6 shadow-lg shadow-energy-yellow/20"
          >
            {loading ? <Loader className="animate-spin" /> : <Mountain size={32} />}
          </motion.div>

          <motion.h2 layout className="text-4xl font-heading font-bold text-energy-yellow uppercase tracking-wide mb-2">
            {isSignUp ? "Join the Tribe" : "Welcome Back"}
          </motion.h2>
          <motion.p layout className="text-neutral-lightGray text-center mb-8 text-sm">
            {isSignUp 
              ? "Start your adventure log today." 
              : "Enter your credentials to access your log."}
          </motion.p>

          <div className="w-full space-y-4">
            
            <AnimatePresence>
              {isSignUp && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative group overflow-hidden"
                >
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-energy-yellow transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="Explorer Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-nature-dark/60 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-energy-yellow focus:ring-1 focus:ring-energy-yellow transition-all cursor-text mb-4"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-energy-yellow transition-colors" size={20} />
              <input 
                type="email" 
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                onKeyDown={handleKeyDown}
                className="w-full bg-nature-dark/60 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-energy-yellow focus:ring-1 focus:ring-energy-yellow transition-all cursor-text"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-energy-yellow transition-colors" size={20} />
              <input 
                type="password" 
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                onKeyDown={handleKeyDown}
                className="w-full bg-nature-dark/60 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-energy-yellow focus:ring-1 focus:ring-energy-yellow transition-all cursor-text"
              />
            </div>

            {/* BUTTON WITH LOADING STATE */}
            <button 
              type="button" 
              onClick={executeLogin}
              disabled={loading}
              className="w-full bg-energy-orange text-white font-heading font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-energy-gold shadow-lg shadow-energy-orange/20 transition-all mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : (isSignUp ? "Start Adventure" : "Login")}
            </button>

          </div>

          <div className="mt-8 flex flex-col items-center gap-4 text-sm">
            
            {!isSignUp && (
              <button 
                type="button"
                onClick={() => alert("Reset functionality requires backend setup.")}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Forgot Password?
              </button>
            )}
            
            <div className="w-full h-[1px] bg-white/10" />
            
            <p className="text-gray-400">
              {isSignUp ? "Already have an account? " : "New to the tribe? "}
              <button 
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-energy-yellow font-bold hover:text-white transition-colors uppercase tracking-wider cursor-pointer"
              >
                {isSignUp ? "Login" : "Create Account"}
              </button>
            </p>

            <button 
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-action-teal hover:text-white transition-colors mt-2 text-xs uppercase tracking-widest font-bold cursor-pointer"
            >
              <ArrowLeft size={14} /> Return to Base Camp
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Login;