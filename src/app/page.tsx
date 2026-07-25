'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function HomePage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Reference for the native banner container
  const bannerRef = useRef<HTMLDivElement>(null);

  // 1. Fetch Movies from Live Render Backend
  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const backendUrl = 'https://movie-platform-backend-g5w5.onrender.com';
        const res = await fetch(`${backendUrl}/movies`);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
        setMovies(Array.isArray(json) ? json : (json.data || []));
      } catch (err: any) {
        setError(err.message || 'Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  // 2. Inject Popunder Script on Page Load
  useEffect(() => {
    const popunderScript = document.createElement('script');
    popunderScript.src = 'https://pl30515811.effectivecpmnetwork.com/e4/d5/cf/e4d5cfac6ae8b6d240c200932bf8c02f.js';
    popunderScript.async = true;
    document.body.appendChild(popunderScript);

    return () => {
      // Cleanup script if component unmounts
      try {
        document.body.removeChild(popunderScript);
      } catch (e) {}
    };
  }, []);

  // 3. Inject Native Banner Script into Container
  useEffect(() => {
    if (bannerRef.current && !bannerRef.current.hasChildNodes()) {
      const bannerScript = document.createElement('script');
      bannerScript.async = true;
      bannerScript.setAttribute('data-cfasync', 'false');
      bannerScript.src = 'https://pl30516037.effectivecpmnetwork.com/f4811c63390720e9c05b975e50520e84/invoke.js';
      
      bannerRef.current.appendChild(bannerScript);
    }
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const title = movie.title || '';
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || movie.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      {/* Navbar / Header with Search Bar */}
      <header style={{ backgroundColor: '#1f2937', color: '#fff', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>🎬 Movie Platform</h1>
        <div style={{ width: '300px' }}>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', outline: 'none' }}
          />
        </div>
      </header>

      {/* Main Layout Container */}
      <div style={{ display: 'flex', padding: '30px', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Sidebar / Categories */}
        <aside style={{ width: '220px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', height: 'fit-content' }}>
          <h3>Categories</h3>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '15px' }}>
            {['All', 'Action', 'Sci-Fi', 'Drama'].map((cat) => (
              <li
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  backgroundColor: selectedCategory === cat ? '#e5e7eb' : 'transparent',
                  fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                  marginBottom: '5px'
                }}
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        {/* Content Area */}
        <main style={{ flex: 1 }}>
          
          {/* Native Banner Ad Unit */}
          <div style={{ backgroundColor: '#ffffff', padding: '15px', textAlign: 'center', borderRadius: '8px', marginBottom: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', minHeight: '90px' }}>
            <div id="container-f4811c63390720e9c05b975e50520e84" ref={bannerRef}></div>
          </div>

          <h2>Movies List</h2>

          {loading && <p>Loading movies...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}

          {!loading && !error && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', marginTop: '20px' }}>
              {filteredMovies.length > 0 ? (
                filteredMovies.map((movie, index) => (
                  <div key={movie.id || index} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <div style={{ height: '140px', backgroundColor: '#d1d5db', borderRadius: '4px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#374151' }}>
                      Poster
                    </div>
                    <h4 style={{ margin: '10px 0 5px 0' }}>{movie.title || 'Untitled'}</h4>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>{movie.category || 'General'}</p>
                  </div>
                ))
              ) : (
                <p>No movies match your search.</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}