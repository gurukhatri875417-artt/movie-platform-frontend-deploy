'use client';

import React, { useState } from 'react';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Action');
  const [posterUrl, setPosterUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    try {
      const backendUrl = 'https://movie-platform-backend-g5w5.onrender.com';
      const res = await fetch(`${backendUrl}/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          category,
          posterUrl,
          videoUrl,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to upload movie to backend.');
      }

      setStatusMessage('🎉 Movie uploaded successfully!');
      setTitle('');
      setPosterUrl('');
      setVideoUrl('');
    } catch (err: any) {
      setStatusMessage(`❌ Error: ${err.message || 'Something went wrong'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#1f2937', color: '#fff', padding: '15px 30px', borderRadius: '8px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '20px' }}>🛠️ Movie Admin Panel</h1>
        <a href="/" style={{ color: '#93c5fd', textDecoration: 'none', fontSize: '14px' }}>&larr; Back to Site</a>
      </header>

      {/* Form Container */}
      <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#111827', fontSize: '22px' }}>Upload New Movie</h2>

        {statusMessage && (
          <div style={{ padding: '12px', marginBottom: '20px', borderRadius: '4px', backgroundColor: statusMessage.includes('🎉') ? '#def7ec' : '#fde8e8', color: statusMessage.includes('🎉') ? '#03543f' : '#9b1c1c', fontSize: '14px' }}>
            {statusMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151', fontSize: '14px' }}>Movie Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Inception"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '16px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151', fontSize: '14px' }}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '16px', backgroundColor: '#fff', boxSizing: 'border-box' }}
            >
              <option value="Action">Action</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedy</option>
              <option value="Horror">Horror</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151', fontSize: '14px' }}>Poster Image URL</label>
            <input
              type="url"
              required
              placeholder="https://example.com/poster.jpg"
              value={posterUrl}
              onChange={(e) => setPosterUrl(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '16px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151', fontSize: '14px' }}>Video Streaming URL</label>
            <input
              type="url"
              required
              placeholder="https://example.com/movie.mp4"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '16px', boxSizing: 'border-box' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: '#2563eb', color: '#fff', padding: '14px', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
          >
            {loading ? 'Uploading...' : 'Publish Movie'}
          </button>
        </form>
      </div>
    </div>
  );
}