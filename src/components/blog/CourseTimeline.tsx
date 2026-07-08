'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const CourseMap = dynamic(() => import('./CourseMap'), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-surface-variant/20 rounded-xl flex items-center justify-center text-on-surface-variant font-label-bold animate-pulse">지도 로딩 중...</div>
});

export interface CourseStep {
  time: string;
  place_name: string;
  activities: string[];
  coordinates?: { lat: number; lng: number };
}

export interface CourseMetadata {
  type: 'course';
  duration_days?: number;
  transport?: string;
  steps?: CourseStep[];
}

export default function CourseTimeline({ metadata }: { metadata: CourseMetadata }) {
  if (!metadata || metadata.type !== 'course') return null;

  // Removed Naver Maps URL generation as it does not reliably support multiple waypoints via web URL

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/50 rounded-2xl p-6 mb-8 shadow-sm">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between border-b border-outline-variant/30 pb-4">
        <h3 className="font-display-sm text-on-surface flex items-center gap-2 mb-2 md:mb-0">
          <span className="material-symbols-outlined text-primary">route</span>
          추천 코스 일정
        </h3>
        <div className="flex gap-3">
          {metadata.duration_days && (
            <span className="px-3 py-1 bg-surface-variant text-on-surface-variant text-sm font-label-bold rounded-full">
              {metadata.duration_days}일 코스
            </span>
          )}
          {metadata.transport && (
            <span className="px-3 py-1 bg-surface-variant text-on-surface-variant text-sm font-label-bold rounded-full">
              {metadata.transport}
            </span>
          )}
        </div>
      </div>

      {metadata.steps && metadata.steps.length > 0 && (
        <div className="mb-8">
          <CourseMap steps={metadata.steps} />
        </div>
      )}

      <div className="relative border-l-2 border-primary/20 ml-3 md:ml-4 space-y-8 py-2">
        {metadata.steps?.map((step, idx) => (
          <div key={idx} className="relative pl-6 md:pl-8">
            <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-white"></span>
            <div className="flex flex-col">
              <span className="text-primary font-label-bold text-sm mb-1">{step.time}</span>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="font-headline-sm text-on-surface">{step.place_name}</h4>
                {step.coordinates?.lat && step.coordinates?.lng && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${step.coordinates.lat},${step.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 bg-surface-variant hover:bg-outline-variant/30 text-on-surface-variant px-2 py-1 rounded text-[12px] font-label-bold flex items-center gap-1 transition-colors"
                    title="View on Google Maps"
                  >
                    <span className="material-symbols-outlined text-[14px]">map</span>
                    Map
                  </a>
                )}
              </div>
              {step.activities && step.activities.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {step.activities.map((activity, aIdx) => (
                    <span key={aIdx} className="px-2 py-1 bg-primary-container text-on-primary-container text-[12px] font-label-bold rounded-md">
                      {activity}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
