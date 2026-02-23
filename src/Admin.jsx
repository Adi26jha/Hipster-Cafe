// src/Admin.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Trash2, Plus, Users, Calendar, LogOut } from 'lucide-react';

const Admin = () => {
  // 1. Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  
  // 2. Dashboard State
  const [activeTab, setActiveTab] = useState('signups'); 
  const [signups, setSignups] = useState([]);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', category: '', image: '' });

  // --- THE CURSOR FIX (Nuclear Option) ---
  useEffect(() => {
    // 1. Create a style tag
    const style = document.createElement('style');
    
    // 2. Force cursor on EVERYTHING with !important
    style.innerHTML = `
      *, body, button, input, textarea, select {
        cursor: auto !important;
      }
      button:hover, a:hover, tr:hover {
        cursor: pointer !important;
      }
    `;
    
    // 3. Inject it into the head
    document.head.appendChild(style);

    // 4. Cleanup: Remove it when leaving Admin page so Home page custom cursor works again
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // --- LOGIN LOGIC ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === '1234') { 
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert("Wrong PIN");
    }
  };

  // --- DATA FETCHING ---
  const fetchData = async () => {
    const { data: signupsData } = await supabase.from('signups').select('*').order('created_at', { ascending: false });
    if (signupsData) setSignups(signupsData);

    const { data: eventsData } = await supabase.from('events').select('*').order('id', { ascending: true });
    if (eventsData) setEvents(eventsData);
  };

  // --- EVENT ACTIONS ---
  const handleDeleteEvent = async (id) => {
    if (window.confirm("Delete this event?")) {
      await supabase.from('events').delete().eq('id', id);
      fetchData();
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    await supabase.from('events').insert([newEvent]);
    setNewEvent({ title: '', date: '', category: '', image: '' });
    alert("Event Added!");
    fetchData();
  };

  // RENDER 1: LOCK SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-primary-cream flex items-center justify-center text-primary-brown font-sans">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl border border-ui-border text-center">
          <h2 className="text-2xl font-bold mb-4 text-accent-gold">ADMIN ACCESS</h2>
          <input 
            type="password" 
            placeholder="Enter PIN" 
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="bg-primary-cream border border-gray-700 p-2 rounded text-primary-brown text-center text-xl mb-4 w-full outline-none focus:border-accent-gold"
          />
          <button type="submit" className="bg-accent-rust w-full py-2 rounded font-bold hover:bg-orange-700">UNLOCK</button>
        </form>
      </div>
    );
  }

  // RENDER 2: DASHBOARD
  return (
    <div className="min-h-screen bg-white text-primary-brown font-sans p-8">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-ui-border">
        <h1 className="text-3xl font-heading text-accent-gold">BASE CAMP COMMAND</h1>
        <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 text-gray-500 hover:text-primary-brown">
          <LogOut size={20} /> Logout
        </button>
      </div>

      <div className="flex gap-4 mb-8">
        <button onClick={() => setActiveTab('signups')} className={`px-6 py-2 rounded flex items-center gap-2 font-bold ${activeTab === 'signups' ? 'bg-accent-rust text-primary-brown' : 'bg-gray-800 text-gray-500'}`}>
          <Users size={18} /> Signups ({signups.length})
        </button>
        <button onClick={() => setActiveTab('events')} className={`px-6 py-2 rounded flex items-center gap-2 font-bold ${activeTab === 'events' ? 'bg-accent-rust text-primary-brown' : 'bg-gray-800 text-gray-500'}`}>
          <Calendar size={18} /> Manage Events
        </button>
      </div>

      {activeTab === 'signups' && (
        <div className="bg-primary-cream/40 rounded-xl overflow-hidden border border-ui-border">
          <table className="w-full text-left">
            <thead className="bg-gray-800 text-gray-500 uppercase text-xs">
              <tr><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Interest</th><th className="p-4">Date</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {signups.map((s) => (
                <tr key={s.id} className="hover:bg-gray-800/50">
                  <td className="p-4 font-bold">{s.name}</td>
                  <td className="p-4 text-gray-500">{s.email}</td>
                  <td className="p-4"><span className="bg-gray-700 px-2 py-1 rounded text-xs">{s.type || 'General'}</span></td>
                  <td className="p-4 text-gray-500 text-sm">{new Date(s.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
             {events.map((ev) => (
               <div key={ev.id} className="bg-primary-cream/40 border border-ui-border p-4 rounded flex items-center gap-4">
                 <img src={ev.image} alt={ev.title} className="w-16 h-16 object-cover rounded" />
                 <div className="flex-1">
                   <h3 className="font-bold text-lg">{ev.title}</h3>
                   <p className="text-gray-500 text-sm">{ev.date} • {ev.category}</p>
                 </div>
                 <button onClick={() => handleDeleteEvent(ev.id)} className="p-2 text-red-500 hover:bg-red-900/20 rounded">
                   <Trash2 size={20} />
                 </button>
               </div>
             ))}
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl h-fit border border-gray-700">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Plus size={20} className="text-accent-gold" /> Add New Event</h3>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <input className="w-full bg-primary-cream border border-gray-600 p-3 rounded text-primary-brown" placeholder="Event Title" required value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
              <div className="grid grid-cols-2 gap-2">
                 <input className="w-full bg-primary-cream border border-gray-600 p-3 rounded text-primary-brown" placeholder="Date (e.g. Oct 12)" required value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
                 <input className="w-full bg-primary-cream border border-gray-600 p-3 rounded text-primary-brown" placeholder="Category" required value={newEvent.category} onChange={e => setNewEvent({...newEvent, category: e.target.value})} />
              </div>
              <input className="w-full bg-primary-cream border border-gray-600 p-3 rounded text-primary-brown" placeholder="Image URL" required value={newEvent.image} onChange={e => setNewEvent({...newEvent, image: e.target.value})} />
              <button type="submit" className="w-full bg-accent-gold text-black font-bold py-3 rounded hover:bg-yellow-500">PUBLISH EVENT</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;