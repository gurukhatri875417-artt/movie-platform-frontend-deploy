"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  genre: string;
  quality: string;
}

const GENRES = ['All', 'Sci-Fi', 'Fantasy', 'Animation'];

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (search) query.append('search', search);
        if (selectedGenre !== 'All') query.append('genre', selectedGenre);

        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${backendUrl}/movies?${query.toString()}`);
        const json = await res.json();
        setMovies(json.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchMovies, 300);
    return () => clearTimeout(timer);
  }, [search, selectedGenre]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8 md:p-16">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
            Stream & Download Portal
          </h1>
          <p className="text-slate-400 text-lg">
            Search and stream high-definition movies powered by Next.js, Express & PostgreSQL.
          </p>
        </header>

        {/* Search Bar & Category Filter Controls */}
        <section className="mb-10 space-y-4">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search movies by title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-5 py-3.5 pl-11 focus:outline-none focus:border-red-500 transition-colors shadow-inner"
            />
            <span className="absolute left-4 top-3.5 text-slate-500">??</span>
          </div>

          {/* Genre Badges */}
          <div className="flex flex-wrap gap-2.5 items-center">
            <span className="text-xs text-slate-400 font-semibold mr-2">Categories:</span>
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedGenre === genre
                    ? 'bg-red-600 text-white shadow-md shadow-red-900/30'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </section>

        {/* Movie Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-12 text-slate-500">Loading movies...</div>
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <Link
                key={movie.id}
                href={`/watch/${movie.id}`}
                className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-950/20 flex flex-col"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-800">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 right-3 bg-red-600/90 text-white text-xs font-semibold px-2.5 py-1 rounded shadow">
                    {movie.quality}
                  </span>
                  <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm text-slate-300 text-xs px-2.5 py-1 rounded border border-slate-700">
                    {movie.genre}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                    {movie.title}
                  </h2>
                  <p className="text-slate-400 text-sm line-clamp-2 mb-4 flex-grow">
                    {movie.description}
                  </p>
                  <span className="text-xs font-semibold text-red-500 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Watch Stream & Download ?
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-slate-500">
              No movies matched your search criteria.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
