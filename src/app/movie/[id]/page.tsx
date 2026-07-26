'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Plyr = dynamic(() => import('plyr-react'), { ssr: false });
import 'plyr-react/plyr.css';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`https://movie-platform-backend-g5w5.onrender.com/api/movies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movie details:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <p className="animate-pulse">Loading stream...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4">Movie Not Found</h2>
        <Link href="/" className="px-4 py-2 bg-red-600 rounded-lg">Back to Home</Link>
      </div>
    );
  }

  const videoSrc = {
    type: 'video' as const,
    sources: [
      {
        src: movie.videoUrl,
        provider: 'html5' as const,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 md:px-16 max-w-5xl mx-auto">
      <Link href="/" className="text-sm text-gray-400 hover:text-white mb-6 inline-block">
        ← Back to Home
      </Link>

      <h1 className="text-2xl md:text-4xl font-bold mb-6">{movie.title}</h1>

      {/* Video Streaming Player */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl mb-8">
        <Plyr source={videoSrc} />
      </div>

      {/* Native Bar Ad Section */}
      <div className="my-6 flex justify-center bg-gray-900 border border-gray-800 p-4 rounded-xl">
        <script 
          async 
          data-cfasync="false" 
          src="https://pl30516037.effectivecpmnetwork.com/f4811c63390720e9c05b975e50520e84/invoke.js"
        ></script>
        <div id="container-f4811c63390720e9c05b975e50520e84"></div>
      </div>

      {/* Direct Download Section */}
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-xl">
        <h3 className="text-lg font-semibold mb-4 text-red-500">📥 High-Speed Download Links</h3>
        
        <div className="flex flex-wrap gap-4">
          {movie.downloadUrl720p ? (
            <a
              href={movie.downloadUrl720p}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[200px] py-3 px-6 bg-blue-600 hover:bg-blue-700 text-center font-semibold rounded-lg transition shadow-lg"
            >
              Download 720p (HD)
            </a>
          ) : (
            <button disabled className="flex-1 min-w-[200px] py-3 px-6 bg-gray-800 text-gray-500 cursor-not-allowed rounded-lg">
              720p Unavailable
            </button>
          )}

          {movie.downloadUrl1080p ? (
            <a
              href={movie.downloadUrl1080p}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[200px] py-3 px-6 bg-red-600 hover:bg-red-700 text-center font-semibold rounded-lg transition shadow-lg"
            >
              Download 1080p (FHD)
            </a>
          ) : (
            <button disabled className="flex-1 min-w-[200px] py-3 px-6 bg-gray-800 text-gray-500 cursor-not-allowed rounded-lg">
              1080p Unavailable
            </button>
          )}
        </div>
      </div>
    </div>
  );
}