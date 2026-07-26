'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://movie-platform-backend-g5w5.onrender.com/api/movies')
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <p className="text-xl animate-pulse">Loading Bollyflix Catalog...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 md:px-12 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-extrabold text-red-600 tracking-wider">BOLLYFLIX CLONE</h1>
        <Link href="/admin" className="text-sm px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
          Admin Portal
        </Link>
      </header>

      {/* Native Bar Ad Section */}
      <div className="my-6 flex justify-center bg-gray-900 border border-gray-800 p-4 rounded-xl">
        <script 
          async 
          data-cfasync="false" 
          src="https://pl30516037.effectivecpmnetwork.com/f4811c63390720e9c05b975e50520e84/invoke.js"
        ></script>
        <div id="container-f4811c63390720e9c05b975e50520e84"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Link 
            key={movie._id} 
            href={`/movie/${movie._id}`}
            className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden group hover:border-red-600 transition duration-300 flex flex-col"
          >
            <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-800">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="object-cover w-full h-full group-hover:scale-105 transition duration-500"
              />
              <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                {movie.downloadUrl1080p && (
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    1080p
                  </span>
                )}
                {movie.downloadUrl720p && (
                  <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    720p
                  </span>
                )}
              </div>
            </div>
            
            <div className="p-4 flex flex-col flex-grow justify-between">
              <h2 className="font-semibold text-sm line-clamp-1 group-hover:text-red-500 transition">
                {movie.title}
              </h2>
              <span className="text-xs text-gray-400 mt-2">Click to Watch / Download</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}