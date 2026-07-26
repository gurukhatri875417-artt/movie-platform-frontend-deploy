'use client';

import React from 'react';
import { Plyr } from 'plyr-react';
import 'plyr-react/plyr.css';

interface VideoPlayerProps {
  videoUrl: string;
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const isEmbed = videoUrl.includes('iframe') || videoUrl.includes('embed') || videoUrl.includes('youtube');

  if (isEmbed) {
    return (
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
        <iframe
          src={videoUrl}
          className="w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
      <Plyr
        source={{
          type: 'video',
          sources: [
            {
              src: videoUrl,
              provider: 'html5',
            },
          ],
        }}
        options={{
          autoplay: false,
          controls: [
            'play-large',
            'play',
            'progress',
            'current-time',
            'duration',
            'mute',
            'volume',
            'settings',
            'fullscreen',
          ],
        }}
      />
    </div>
  );
}