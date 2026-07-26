import React from 'react';
import VideoPlayer from '@/app/components/VideoPlayer';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = params;
  
  let movie: any = null;
  try {
    const res = await fetch(`https://movie-platform-backend-g5w5.onrender.com/api/movies/${id}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      movie = await res.json();
    }
  } catch (error) {
    console.error('Failed to fetch movie details:', error);
  }

  if (!movie) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-16 text-center text-white">
        <h1 className="text-2xl font-bold">Movie not found</h1>
        <p className="text-gray-400 mt-2">The requested movie could not be loaded.</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">{movie.title}</h1>
      
      {/* Video Stream Player */}
      <VideoPlayer videoUrl={movie.videoUrl || ''} />

      {/* Direct Download Options Section */}
      <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl">
        <h3 className="text-xl font-semibold text-white mb-4">Download Links</h3>
        <div className="flex flex-wrap gap-4">
          {movie.downloadUrl720p && (
            <a 
              href={movie.downloadUrl720p} 
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium border border-gray-700 transition"
            >
              Download 720p
            </a>
          )}
          {movie.downloadUrl1080p && (
            <a 
              href={movie.downloadUrl1080p} 
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
            >
              Download 1080p
            </a>
          )}
        </div>
      </div>
    </main>
  );
}