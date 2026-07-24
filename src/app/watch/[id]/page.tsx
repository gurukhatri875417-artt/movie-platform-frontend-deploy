import React from 'react';
import Link from 'next/link';
import VideoPlayer from '@/components/VideoPlayer';

async function getMovieDetails(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/movies/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  } catch (err) {
    return { data: null, error: true };
  }
}

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const response = await getMovieDetails(resolvedParams.id);
  const movie = response.data || {
    id: resolvedParams.id,
    title: 'Sample Sci-Fi Stream',
    description: 'A futuristic journey through deep space and high-tech worlds.',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    quality: '1080p Ultra HD'
  };

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const downloadApiUrl = `${backendUrl}/movies/${resolvedParams.id}/download`;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm text-slate-400 hover:text-white mb-6 transition-colors">
          ? Back to Catalog
        </Link>

        <header className="mb-6">
          <h1 className="text-3xl font-extrabold text-slate-100 mb-2">{movie.title}</h1>
          <p className="text-slate-400 text-sm">{movie.description || 'High definition video stream ready for playback and fast download.'}</p>
        </header>

        {/* HLS Video Player Component */}
        <section className="mb-8">
          <VideoPlayer src={movie.streamUrl || 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'} />
        </section>

        {/* Download Section */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-200">Download Offline Media</h3>
            <p className="text-slate-400 text-xs mt-1">Format: MP4 | Quality: {movie.quality || '1080p'}</p>
          </div>
          <a
            href={downloadApiUrl}
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg text-sm transition-colors text-center w-full md:w-auto shadow-md hover:shadow-red-900/30"
          >
            ?? Download Movie (HD)
          </a>
        </section>
      </div>
    </main>
  );
}
