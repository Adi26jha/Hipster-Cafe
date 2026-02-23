import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';
import { 
  PenTool, 
  LogOut, 
  User, 
  BookOpen, 
  Settings, 
  LayoutDashboard, 
  Save, 
  Camera 
} from 'lucide-react';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Navigation State
  const [activeTab, setActiveTab] = useState('overview'); // overview, write, stories, settings

  // Data State
  const [stories, setStories] = useState([]);
  const [profile, setProfile] = useState({ fullName: '', avatarUrl: '', bio: '' });
  
  // Blog Form State
  const [blogForm, setBlogForm] = useState({ title: '', content: '', image: '' });

  // --- 1. CURSOR FIX (Essential for Admin/Dashboard pages) ---
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      *, body, button, input, div, textarea { cursor: auto !important; }
      button:hover, a:hover, .clickable:hover { cursor: pointer !important; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // --- 2. INITIAL DATA FETCH ---
  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }
      setUser(user);
      
      // Load Profile Data from metadata
      setProfile({
        fullName: user.user_metadata?.full_name || '',
        avatarUrl: user.user_metadata?.avatar_url || '',
        bio: user.user_metadata?.bio || ''
      });

      // Load User's Stories
      const { data } = await supabase.from('stories').select('*').eq('user_id', user.id);
      setStories(data || []);
    };
    init();
  }, [navigate]);

  // --- 3. ACTIONS ---

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.updateUser({
      data: { 
        full_name: profile.fullName,
        avatar_url: profile.avatarUrl,
        bio: profile.bio
      }
    });

    if (error) alert("Error updating profile");
    else alert("Profile updated successfully!");
    
    setLoading(false);
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.from('stories').insert([
      {
        user_id: user.id,
        author_name: profile.fullName || user.email.split('@')[0], 
        title: blogForm.title,
        content: blogForm.content,
        image: blogForm.image || 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2070' 
      }
    ]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Story Published!");
      setBlogForm({ title: '', content: '', image: '' }); 
      // Refresh stories
      const { data } = await supabase.from('stories').select('*').eq('user_id', user.id);
      setStories(data || []);
      setActiveTab('stories');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-primary-cream text-primary-brown font-sans flex flex-col md:flex-row">
      
      {/* --- SIDEBAR NAVIGATION --- */}
      <aside className="w-full md:w-64 bg-secondary-charcoal border-r border-ui-border flex flex-col justify-between h-auto md:h-screen sticky top-0">
        <div>
          {/* User Snippet */}
          <div className="p-6 border-b border-ui-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden border border-accent-gold">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-accent-gold"><User size={20}/></div>
              )}
            </div>
            <div>
              <p className="font-bold text-sm truncate w-32">{profile.fullName || 'Explorer'}</p>
              <p className="text-xs text-gray-500 truncate w-32">{user.email}</p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-2">
            <SidebarBtn icon={<LayoutDashboard size={18}/>} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <SidebarBtn icon={<PenTool size={18}/>} label="Write Story" active={activeTab === 'write'} onClick={() => setActiveTab('write')} />
            <SidebarBtn icon={<BookOpen size={18}/>} label="My Stories" active={activeTab === 'stories'} onClick={() => setActiveTab('stories')} />
            <SidebarBtn icon={<Settings size={18}/>} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          </nav>
        </div>

        <div className="p-4 border-t border-ui-border">
          <button onClick={handleLogout} className="flex items-center gap-2 text-gray-500 hover:text-primary-brown transition-colors w-full p-2 rounded clickable">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        
        {/* VIEW: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-heading text-accent-gold">Welcome Back, {profile.fullName || 'Traveler'}.</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stat Card 1 */}
              <div className="bg-white p-6 rounded-xl border border-ui-border">
                <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Total Stories</h3>
                <p className="text-4xl font-bold text-primary-brown">{stories.length}</p>
              </div>
              {/* Stat Card 2 */}
              <div className="bg-white p-6 rounded-xl border border-ui-border">
                <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Member Since</h3>
                <p className="text-xl font-bold text-primary-brown">{new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="bg-accent-rust/10 border border-accent-rust/30 p-6 rounded-xl mt-8">
              <h3 className="font-bold text-accent-rust mb-2">Platform Update</h3>
              <p className="text-sm text-gray-300">New features added! You can now update your profile picture in the Settings tab.</p>
            </div>
          </div>
        )}

        {/* VIEW: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-heading text-primary-brown mb-6 flex items-center gap-2">
              <Settings size={24} className="text-accent-gold"/> Profile Settings
            </h2>
            
            <form onSubmit={handleUpdateProfile} className="space-y-6 bg-white p-8 rounded-xl border border-ui-border">
              {/* Avatar Section */}
              <div>
                <label className="block text-gray-500 text-sm mb-2">Profile Image URL</label>
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary-cream border border-gray-700 overflow-hidden flex-shrink-0">
                    {profile.avatarUrl ? <img src={profile.avatarUrl} alt="preview" className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-gray-600"><Camera size={24}/></div>}
                  </div>
                  <input 
                    className="flex-1 bg-primary-cream border border-gray-700 rounded p-3 text-primary-brown focus:border-accent-gold outline-none"
                    placeholder="https://..."
                    value={profile.avatarUrl}
                    onChange={e => setProfile({...profile, avatarUrl: e.target.value})}
                  />
                </div>
              </div>

              {/* Name Section */}
              <div>
                <label className="block text-gray-500 text-sm mb-2">Display Name</label>
                <input 
                  className="w-full bg-primary-cream border border-gray-700 rounded p-3 text-primary-brown focus:border-accent-gold outline-none"
                  placeholder="Your Name"
                  value={profile.fullName}
                  onChange={e => setProfile({...profile, fullName: e.target.value})}
                />
              </div>

               {/* Bio Section */}
               <div>
                <label className="block text-gray-500 text-sm mb-2">Short Bio</label>
                <textarea 
                  className="w-full bg-primary-cream border border-gray-700 rounded p-3 text-primary-brown focus:border-accent-gold outline-none h-24 resize-none"
                  placeholder="Tell us about your adventures..."
                  value={profile.bio}
                  onChange={e => setProfile({...profile, bio: e.target.value})}
                />
              </div>

              <button disabled={loading} className="bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200 clickable flex items-center gap-2">
                {loading ? 'Saving...' : <><Save size={18} /> Save Changes</>}
              </button>
            </form>
          </div>
        )}

        {/* VIEW: WRITE STORY */}
        {activeTab === 'write' && (
          <div className="max-w-3xl">
            <h2 className="text-2xl font-heading text-primary-brown mb-6">Write a Story</h2>
            <div className="bg-white p-8 rounded-xl border border-ui-border">
              <form onSubmit={handlePublish} className="space-y-4">
                <input 
                  className="w-full bg-primary-cream border border-gray-700 p-4 rounded text-primary-brown text-lg focus:border-accent-gold outline-none"
                  placeholder="Story Title"
                  value={blogForm.title}
                  onChange={e => setBlogForm({...blogForm, title: e.target.value})}
                  required
                />
                <input 
                  className="w-full bg-primary-cream border border-gray-700 p-3 rounded text-primary-brown text-sm focus:border-accent-gold outline-none"
                  placeholder="Cover Image URL (Optional)"
                  value={blogForm.image}
                  onChange={e => setBlogForm({...blogForm, image: e.target.value})}
                />
                <textarea 
                  className="w-full h-64 bg-primary-cream border border-gray-700 p-4 rounded text-primary-brown focus:border-accent-gold outline-none resize-none"
                  placeholder="Start writing here..."
                  value={blogForm.content}
                  onChange={e => setBlogForm({...blogForm, content: e.target.value})}
                  required
                />
                <button type="submit" disabled={loading} className="px-8 py-3 bg-accent-rust text-primary-brown font-bold rounded hover:bg-orange-700 clickable">
                  {loading ? 'Publishing...' : 'PUBLISH STORY'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* VIEW: MY STORIES */}
        {activeTab === 'stories' && (
          <div>
            <h2 className="text-2xl font-heading text-primary-brown mb-6">My Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stories.length === 0 ? (
                <p className="text-gray-500">No stories yet. Go write one!</p>
              ) : (
                stories.map(story => (
                  <div key={story.id} className="bg-white rounded-xl overflow-hidden border border-ui-border flex flex-col">
                     <div className="h-40 overflow-hidden">
                       <img src={story.image} alt="cover" className="w-full h-full object-cover"/>
                     </div>
                     <div className="p-4 flex-1">
                       <h3 className="font-bold text-lg text-primary-brown mb-2">{story.title}</h3>
                       <p className="text-gray-500 text-sm line-clamp-3">{story.content}</p>
                     </div>
                     <div className="p-4 border-t border-ui-border text-xs text-gray-500">
                       Published: {new Date(story.created_at).toLocaleDateString()}
                     </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

// Helper Component for Sidebar Buttons
const SidebarBtn = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors clickable ${
      active ? 'bg-accent-rust text-primary-brown font-bold' : 'text-gray-500 hover:bg-gray-800 hover:text-primary-brown'
    }`}
  >
    {icon} {label}
  </button>
);

export default UserDashboard;