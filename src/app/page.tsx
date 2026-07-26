'client';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [title, setTitle] = useState('');
  const [poster, setPoster] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState('');

  const BACKEND_URL = 'https://movie-platform-backend-g5w5.onrender.com/movies';

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await fetch(BACKEND_URL);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setMovies(data);
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage('Uploading...');

    try {
      const payload = { title, poster, videoUrl };

      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Movie uploaded successfully!');
        setTitle('');
        setPoster('');
        setVideoUrl('');
        fetchMovies();
      } else {
        setMessage('Upload failed: ' + (data.error || JSON.stringify(data)));
      }
    } catch (err) {
      setMessage('Network error: ' + err.message);
    }
  };

  return (
    <main style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto', color: '#000000', background: '#ffffff', minHeight: '100vh' }}>
      <h1 style={{ color: '#000000', fontSize: '28px', fontWeight: '900' }}>Admin Movie Upload Panel</h1>
      
      <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#e9ecef', padding: '20px', borderRadius: '8px', border: '2px solid #000000' }}>
        <h3 style={{ margin: '0 0 5px 0', color: '#000000', fontWeight: '900' }}>Add New Movie</h3>
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: '12px', fontSize: '16px', color: '#000000', background: '#ffffff', border: '2px solid #000000', borderRadius: '4px', fontWeight: 'bold' }}
        />
        <input
          type="text"
          placeholder="Poster Image URL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
          required
          style={{ padding: '12px', fontSize: '16px', color: '#000000', background: '#ffffff', border: '2px solid #000000', borderRadius: '4px', fontWeight: 'bold' }}
        />
        <input
          type="text"
          placeholder="Video Stream URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
          style={{ padding: '12px', fontSize: '16px', color: '#000000', background: '#ffffff', border: '2px solid #000000', borderRadius: '4px', fontWeight: 'bold' }}
        />
        <button type="submit" style={{ padding: '14px', background: '#000000', color: '#ffffff', border: 'none', fontSize: '18px', fontWeight: '900', cursor: 'pointer', borderRadius: '4px' }}>
          UPLOAD MOVIE
        </button>
        {message && <p style={{ fontWeight: '900', color: message.includes('success') ? 'green' : 'red', margin: '5px 0', fontSize: '16px' }}>{message}</p>}
      </form>

      <hr style={{ margin: '30px 0', border: '0', borderTop: '2px solid #000000' }} />

      <h2 style={{ color: '#000000', fontWeight: '900' }}>Uploaded Movies List ({movies.length})</h2>
      {movies.length === 0 ? (
        <p style={{ color: '#000000', fontWeight: 'bold' }}>No movies uploaded yet.</p>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {movies.map((movie, index) => (
            <div key={index} style={{ border: '2px solid #000000', padding: '15px', borderRadius: '8px', display: 'flex', gap: '15px', alignItems: 'center', background: '#ffffff' }}>
              {movie.poster && (
                <img 
                  src={movie.poster} 
                  alt={movie.title} 
                  style={{ width: '60px', height: '90px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #000000' }} 
                  onError={(e)=>{e.target.style.display='none'}} 
                />
              )}
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#000000', fontWeight: '900' }}>{movie.title}</h4>
                <a 
                  href={movie.videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ display: 'inline-block', padding: '10px 16px', background: '#000000', color: '#ffffff', textDecoration: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: '900' }}
                >
                  PLAY / WATCH VIDEO
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}