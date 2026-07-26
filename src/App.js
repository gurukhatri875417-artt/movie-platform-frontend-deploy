import React, { useState, useEffect } from 'react';

function App() {
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
        fetchMovies(); // Automatically refresh the list below
      } else {
        setMessage('Upload failed: ' + (data.error || JSON.stringify(data)));
      }
    } catch (err) {
      setMessage('Network error: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1>Admin Movie Upload Panel</h1>
      
      <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#f4f4f4', padding: '20px', borderRadius: '8px' }}>
        <h3>Add New Movie</h3>
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input
          type="text"
          placeholder="Poster Image URL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
          required
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input
          type="text"
          placeholder="Video Stream URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px', background: '#0070f3', color: '#fff', border: 'none', fontSize: '16px', cursor: 'pointer' }}>
          Upload Movie
        </button>
        {message && <p style={{ fontWeight: 'bold', color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
      </form>

      <hr style={{ margin: '30px 0' }} />

      <h2>Uploaded Movies List ({movies.length})</h2>
      {movies.length === 0 ? (
        <p>No movies uploaded yet.</p>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {movies.map((movie, index) => (
            <div key={index} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', display: 'flex', gap: '15px', alignItems: 'center', background: '#fff' }}>
              {movie.poster && (
                <img 
                  src={movie.poster} 
                  alt={movie.title} 
                  style={{ width: '60px', height: '90px', objectFit: 'cover', borderRadius: '4px' }} 
                  onError={(e)=>{e.target.style.display='none'}} 
                />
              )}
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{movie.title}</h4>
                <a 
                  href={movie.videoUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ display: 'inline-block', padding: '6px 12px', background: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontSize: '14px' }}
                >
                  Play / Watch Video
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;