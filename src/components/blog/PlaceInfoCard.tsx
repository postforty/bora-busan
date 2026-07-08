import React from 'react';

interface RelatedContent {
  type: string;
  title: string;
}

export interface PlaceMetadata {
  type: 'place';
  address?: string;
  nearest_station?: string;
  hours?: string;
  tips?: string;
  coordinates?: { lat: number; lng: number };
  related_content?: RelatedContent[];
}

export default function PlaceInfoCard({ metadata }: { metadata: PlaceMetadata }) {
  if (!metadata || metadata.type !== 'place') return null;

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/50 rounded-2xl p-6 mb-8 shadow-sm">
      <h3 className="font-display-sm text-on-surface mb-4 border-b border-outline-variant/30 pb-3 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">location_on</span>
        기본 정보
      </h3>
      
      <ul className="space-y-4">
        {metadata.address && (
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px] mt-0.5">map</span>
            <div>
              <p className="font-label-bold text-on-surface">주소</p>
              <p className="text-body-md text-on-surface-variant">{metadata.address}</p>
            </div>
          </li>
        )}
        
        {metadata.nearest_station && (
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px] mt-0.5">directions_subway</span>
            <div>
              <p className="font-label-bold text-on-surface">가까운 역</p>
              <p className="text-body-md text-on-surface-variant">{metadata.nearest_station}</p>
            </div>
          </li>
        )}

        {metadata.hours && (
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px] mt-0.5">schedule</span>
            <div>
              <p className="font-label-bold text-on-surface">운영 시간</p>
              <p className="text-body-md text-on-surface-variant">{metadata.hours}</p>
            </div>
          </li>
        )}

        {metadata.tips && (
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px] mt-0.5">lightbulb</span>
            <div>
              <p className="font-label-bold text-on-surface">방문 꿀팁</p>
              <p className="text-body-md text-on-surface-variant">{metadata.tips}</p>
            </div>
          </li>
        )}

        {metadata.related_content && metadata.related_content.length > 0 && (
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px] mt-0.5">movie</span>
            <div>
              <p className="font-label-bold text-on-surface">관련 콘텐츠</p>
              <ul className="flex flex-col gap-2 mt-2">
                {metadata.related_content.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="px-2 py-0.5 mt-[2px] bg-primary-fixed text-on-primary-fixed text-[11px] font-label-bold rounded shrink-0">
                      {item.type.toUpperCase()}
                    </span>
                    <span className="text-body-sm sm:text-body-md text-on-surface-variant leading-snug">
                      {item.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        )}
      </ul>
      
      {metadata.coordinates && metadata.coordinates.lat && metadata.coordinates.lng && (
        <div className="mt-6 pt-4 border-t border-outline-variant/30 flex gap-2">
          <a href={`https://www.google.com/maps/search/?api=1&query=${metadata.coordinates.lat},${metadata.coordinates.lng}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#4285F4] text-white font-label-bold py-2 rounded-lg text-center text-[13px] sm:text-sm transition-opacity hover:opacity-90 flex items-center justify-center">
            구글지도
          </a>
          <a href={`https://map.kakao.com/link/map/${encodeURIComponent('해당 장소')},${metadata.coordinates.lat},${metadata.coordinates.lng}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#FEE500] text-[#000000] font-label-bold py-2 rounded-lg text-center text-[13px] sm:text-sm transition-opacity hover:opacity-90 flex items-center justify-center">
            카카오맵
          </a>
          <a href={`https://map.naver.com/p/search/${metadata.coordinates.lat},${metadata.coordinates.lng}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#03C75A] text-white font-label-bold py-2 rounded-lg text-center text-[13px] sm:text-sm transition-opacity hover:opacity-90 flex items-center justify-center">
            네이버지도
          </a>
        </div>
      )}
    </div>
  );
}
