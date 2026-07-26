'use client';

import React, { useState, useEffect } from 'react';
import AdBanner from './AdBanner';

interface Movie {
  _id: string;
  title: string;
  poster: string;
  videoUrl: string;
  downloadUrl?: string;
  quality?: string;
  size?: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetch('https://movie-platform-backend-g5w5.onrender.com/movies')
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movies:', err);
        setLoading(false);
      });
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-950 text-white font-sans selection:bg-red-600 selection:text-white">
      {/* Navbar / Header */}
      <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/60 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black tracking-wider text-red-600 bg-red-600/10 px-3 py-1 rounded-xl border border-red-600/20">
              HDhub
            </span>
            <span className="text-sm text-gray-400 hidden sm:inline">| Professional Streaming Hub</span>
          </div>

          {/* Search Bar */}
          <div className="w-full sm:w-96">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-red-600 transition text-sm shadow-inner"
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Top Ad Banner Component */}
        <div className="mb-8">
          <AdBanner />
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-3">
          <h2 className="text-xl font-bold tracking-wide text-gray-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse"></span>
            Latest Movies & Shows
          </h2>
          <span className="text-xs text-gray-500">{filteredMovies.length} Available</span>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-32 text-gray-500">
            <p className="text-lg">No movies found matching your search.</p>
          </div>
        ) : (
          /* Movie Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {filteredMovies.map((movie) => (
              <div
                key={movie._id}
                className="bg-gray-900/60 border border-gray-800/80 rounded-2xl overflow-hidden shadow-lg hover:border-red-600/50 transition-all duration-300 flex flex-col group hover:-translate-y-1"
              >
                {/* Poster Image Container */}
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-950">
                  <img
                    src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster'}
                    alt={movie.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  {movie.quality && (
                    <span className="absolute top-2.5 right-2.5 bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                      {movie.quality}
                    </span>
                  )}
                </div>

                {/* Movie Details */}
                <div className="p-4 flex flex-col flex-grow justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-sm text-gray-100 line-clamp-1 group-hover:text-red-500 transition-colors">
                      {movie.title}
                    </h3>
                    {movie.size && (
                      <p className="text-xs text-gray-400 mt-0.5">{movie.size}</p>
                    )}
                  </div>

                  {/* Watch Now Button Routing to Dynamic Detail/Player Page */}
                  <a
                    href={`/movie/${movie._id}`}
                    className="w-full bg-red-600 hover:bg-red-700 text-white text-center py-2 rounded-xl text-xs font-bold transition shadow-md shadow-red-600/20 flex items-center justify-center gap-1.5"
                  >
                    <span>▶</span> Watch Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Ad Banner Component */}
        <div className="mt-12">
          <AdBanner />
        </div>
      </div>
    </main>
  );
}