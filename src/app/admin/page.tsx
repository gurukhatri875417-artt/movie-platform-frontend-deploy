'use client';

import React, { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [movies, setMovies] = useState<any[]>([]);
  
  // Form state
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [downloadUrl720p, setDownloadUrl720p] = useState('');
  const [downloadUrl1080p, setDownloadUrl1080p] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Set your secure admin password here for multi-user access
    if (passcode === 'my-secure-admin-password-123') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
    } else {
      alert('Incorrect Admin Passcode! Access Denied.');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
      fetchMovies();
    }
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await fetch('https://movie-platform-backend-g5w5.onrender.com/api/movies');
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      console.error('Error fetching movies', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('https://movie-platform-backend-g5w5.onrender.com/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          videoUrl,
          posterUrl,
          downloadUrl720p,
          downloadUrl1080p,
        }),
      });

      if (res.ok) {
        alert('Movie published successfully with streaming & download links!');
        setTitle('');
        setVideoUrl('');
        setPosterUrl('');
        setDownloadUrl720p('');
        setDownloadUrl1080p('');
        fetchMovies();
      } else {
        alert('Failed to publish movie.');
      }
    } catch (err) {
      console.error('Error saving movie', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="bg-gray-900 border border-gray-800 p-8 rounded-xl max-w-md w-full shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">Restricted Admin Portal</h2>
          <p className="text-gray-400 text-sm mb-6 text-center">Enter your authorized administrative passcode.</p>
          <input
            type="password"
            placeholder="Enter Admin Passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white mb-4 focus:outline-none focus:border-red-600"
            required
          />
          <button type="submit" className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition">
            Authenticate & Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold">Admin Content Hub</h1>
        <button
          onClick={() => {
            localStorage.removeItem('admin_auth');
            setIsAuthenticated(false);
          }}
          className="px-4 py-2 bg-gray-800 hover:bg-red-600 text-sm rounded-lg transition"
        >
          Logout Session
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 p-6 rounded-xl mb-12 shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-red-500">Upload New Title & Download Links</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Movie Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600"
          />
          <input
            type="text"
            placeholder="Poster Image URL"
            value={posterUrl}
            onChange={(e) => setPosterUrl(e.target.value)}
            required
            className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Streaming Video URL / Embed Link"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="720p Download Link (Optional)"
            value={downloadUrl720p}
            onChange={(e) => setDownloadUrl720p(e.target.value)}
            className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600"
          />
          <input
            type="text"
            placeholder="1080p Download Link (Optional)"
            value={downloadUrl1080p}
            onChange={(e) => setDownloadUrl1080p(e.target.value)}
            className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600"
          />
        </div>

        <button type="submit" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition">
          Publish to Live Site
        </button>
      </form>
    </div>
  );
}