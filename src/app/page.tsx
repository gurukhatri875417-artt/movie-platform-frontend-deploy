'use client';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const BACKEND_URL = 'https://movie-platform-backend-g5w5.onrender.com/movies';

  useEffect(() => {
    fetchMovies();

    // Inject Adsterra Popunder Script dynamically
    const popunderScript = document.createElement('script');
    popunderScript.src = 'https://pl30515811.effectivecpmnetwork.com/e4/d5/cf/e4d5cfac6ae8b6d240c200932bf8c02f.js';
    popunderScript.async = true;
    document.body.appendChild(popunderScript);

    // Inject Adsterra Native Banner Script dynamically
    const nativeScript = document.createElement('script');
    nativeScript.src = 'https://pl30516037.effectivecpmnetwork.com/f4811c63390720e9c05b975e50520e84/invoke.js';
    nativeScript.async = true;
    nativeScript.setAttribute('data-cfasync', 'false');
    document.body.appendChild(nativeScript);
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

  return (
    <div style={{ background: '#141414', color: '#ffffff', minHeight: '100vh', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Header - HDhub */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '15px', marginBottom: '20px' }}>
        <h1 style={{ color: '#e50914', margin: 0, fontSize: '32px', fontWeight: '900', letterSpacing: '1px' }}>HDhub</h1>
      </header>

      {/* Adsterra Native Banner Ad Container */}
      <div style={{ background: '#1f1f1f', padding: '15px', textAlign: 'center', marginBottom: '20px', borderRadius: '6px', border: '1px solid #333', minHeight: '90px' }}>
        <div id="container-f4811c63390720e9c05b975e50520e84"></div>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Categories Sidebar */}
        <div style={{ width: '200px', background: '#1f1f1f', padding: '15px', borderRadius: '8px', height: 'fit-content' }}>
          <h3 style={{ color: '#fff', marginTop: 0 }}>Categories</h3>
          {['All', 'Action', 'Sci-Fi', 'Drama'].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              style={{ display: 'block', width: '100%', padding: '10px', background: selectedCategory === cat ? '#e50914' : 'transparent', color: '#fff', border: 'none', textAlign: 'left', cursor: 'pointer', borderRadius: '4px', marginBottom: '5px', fontWeight: 'bold' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Movies Grid */}
        <div style={{ flex: 1 }}>
          <h2 style={{ borderBottom: '2px solid #e50914', paddingBottom: '8px', marginTop: 0, color: '#fff' }}>Trending Movies</h2>
          {movies.length === 0 ? (
            <p style={{ color: '#888' }}>No movies found or loading...</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '20px' }}>
              {movies.map((movie, index) => (
                <div key={index} style={{ background: '#1f1f1f', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333', display: 'flex', flexDirection: 'column' }}>
                  {movie.poster ? (
                    <img src={movie.poster} alt={movie.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} onError={(e)=>{e.target.style.display='none'}} />
                  ) : (
                    <div style={{ width: '100%', height: '220px', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#777' }}>No Poster</div>
                  )}
                  <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '15px', color: '#fff' }}>{movie.title}</h4>
                    <a 
                      href={movie.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ background: '#e50914', color: '#fff', textAlign: 'center', padding: '8px', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px' }}
                    >
                      ▶ WATCH NOW
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}