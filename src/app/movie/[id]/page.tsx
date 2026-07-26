'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import VideoPlayer from '../../components/VideoPlayer';
import AdBanner from '../../AdBanner';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://movie-platform-backend-g5w5.onrender.com/movies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movie:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">Loading movie...</div>;
  }

  if (!movie) {
    return <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">Movie not found.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white font-sans p-6 max-w-5xl mx-auto">
      {/* Header Back Button */}
      <div className="mb-6">
        <a href="/" className="text-red-500 hover:underline text-sm font-semibold">&larr; Back to Home</a>
      </div>

      <h1 className="text-3xl font-black mb-4 text-red-600">{movie.title}</h1>

      {/* Embedded Native Video Player */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3 text-gray-200">Watch Online</h2>
        <VideoPlayer videoUrl={movie.videoUrl} />
      </div>

      <AdBanner />

      {/* Download Section */}
      {movie.downloadUrl && (
        <div className="mt-8 bg-gray-900 border border-gray-800 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-lg font-bold">Download Movie</h3>
            <p className="text-gray-400 text-sm">Get high-speed download access for {movie.title}</p>
          </div>
          <a
            href={movie.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition shadow-lg shadow-green-600/20"
          >
            Download Now 🚀
          </a>
        </div>
      )}
    </main>
  );
}