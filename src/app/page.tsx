'use client';

import React, { useState, useEffect } from 'react';

interface Movie {
  _id: string;
  title: string;
  posterUrl?: string;
  image?: string;
  poster?: string;
  videoUrl: string;
  downloadUrl?: string;
  category: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Fetch movies from your Render backend
  useEffect(() => {
    fetch('https://movie-platform-backend-g5w5.onrender.com/movies')
      .then((res) => res.json())
      .then((data) => {
        // Ensure data is an array
        setMovies(Array.isArray(data) ? data : data.movies || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch movies:', err);
        setLoading(false);
      });
  }, []);

  // Inject Adsterra Scripts Dynamically
  useEffect(() => {
    // Popunder Script
    const popunderScript = document.createElement('script');
    popunderScript.type = 'text/javascript';
    popunderScript.src = 'https://pl28414418.effectivecpmrate.com/62/70/ec/6270ec0865dd197d1cd7c34b6b158025.js';
    document.body.appendChild(popunderScript);

    // Native Banner Script Container Setup
    const bannerContainer = document.getElementById('adsterra-native-banner');
    if (bannerContainer && !bannerContainer.hasChildNodes()) {
      const invokeScript = document.createElement('script');
      invokeScript.async = true;
      invokeScript.setAttribute('data-cfasync', 'false');
      invokeScript.src = '//pl28414451.effectivecpmrate.com/0014a5840d21e847c2111cd988ca5f89/invoke.js';
      
      const optionsScript = document.createElement('script');
      optionsScript.type = 'text/javascript';
      optionsScript.innerHTML = `
        atOptions = {
          'key' : '0014a5840d21e847c2111cd988ca5f89',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;
      bannerContainer.appendChild(optionsScript);
      bannerContainer.appendChild(invokeScript);
    }
  }, []);

  // Filter movies based on search and category
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || movie.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Action', 'Drama', 'Comedy', 'Horror', 'Sci-Fi', 'Punjabi'];

  return (
    <main className="min-h-screen bg-gray-950 text-white font-sans selection:bg-red-600 selection:text-white">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-wider text-red-600">HD<span className="text-white">hub</span></span>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-96">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600 transition"
          />
        </div>
      </header>

      {/* Adsterra Native Banner Section */}
      <div className="w-full py-4 flex justify-center bg-gray-950 border-b border-gray-900">
        <div id="adsterra-native-banner" className="min-h-[90px] flex items-center justify-center"></div>
      </div>

      {/* Category Filter Bar */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex gap-2 overflow-x-auto scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Movies Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {loading ? (
          <div className="text-center py-20 text-gray-400 text-lg animate-pulse">Loading HDhub movies...</div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">No movies found. Try another search or category.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredMovies.map((movie) => {
              const poster = movie.posterUrl || movie.image || movie.poster || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800';
              return (
                <div key={movie._id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col group hover:border-red-600/50 transition duration-300 shadow-xl">
                  {/* Poster Thumbnail */}
                  <div className="relative w-full h-64 bg-gray-800 overflow-hidden">
                    <img
                      src={poster}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-xs px-2 py-1 rounded text-red-400 font-bold border border-red-500/20">
                      {movie.category || 'HD'}
                    </span>
                  </div>

                  {/* Movie Info & Action Buttons */}
                  <div className="p-4 flex flex-col flex-grow justify-between gap-3">
                    <h3 className="font-bold text-base line-clamp-1 group-hover:text-red-500 transition">{movie.title}</h3>
                    
                    <div className="flex flex-col gap-2 mt-auto">
                      {/* Watch Now Button */}
                      <a
                        href={movie.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-red-600 hover:bg-red-700 text-white text-center py-2 rounded-lg text-sm font-semibold transition shadow-md shadow-red-600/20"
                      >
                        Watch Now
                      </a>

                      {/* Download Button (Only shows if downloadUrl is provided) */}
                      {movie.downloadUrl && (
                        <a
                          href={movie.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg text-sm font-semibold transition shadow-md shadow-green-600/20"
                        >
                          Download
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 text-center py-6 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} HDhub. All rights reserved.
      </footer>
    </main>
  );
}