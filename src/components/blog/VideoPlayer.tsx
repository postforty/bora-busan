import React from 'react';

export interface VideoMetadata {
  type: 'video';
  video_url: string;
  duration?: string;
}

interface VideoPlayerProps {
  metadata: VideoMetadata;
}

export default function VideoPlayer({ metadata }: VideoPlayerProps) {
  const { video_url } = metadata;
  
  if (!video_url) return null;

  // Extract YouTube video ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(video_url);

  if (!videoId) {
    return (
      <div className="bg-surface-variant p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm border border-outline-variant/30">
        <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-4">videocam_off</span>
        <h3 className="font-display-sm mb-2 text-on-surface">Invalid Video URL</h3>
        <p className="text-on-surface-variant text-sm max-w-sm">
          The provided video URL format is not supported. Please provide a valid YouTube link.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-surface-variant/30 rounded-2xl p-4 md:p-6 mb-8 border border-outline-variant/30">
      <div className="aspect-video w-full rounded-xl overflow-hidden shadow-md bg-black relative">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
          title="YouTube video player"
          className="absolute top-0 left-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      {metadata.duration && (
        <div className="mt-4 flex items-center justify-end text-on-surface-variant font-label-sm">
          <span className="material-symbols-outlined text-[18px] mr-1">schedule</span>
          Duration: {metadata.duration}
        </div>
      )}
    </div>
  );
}
