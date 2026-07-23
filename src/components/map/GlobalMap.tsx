'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

// Fix Leaflet's default marker icon issue in Next.js
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Component to dynamically adjust map bounds when markers change
function MapBoundsUpdater({ markers }: { markers: any[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [markers, map]);

  return null;
}

export default function GlobalMap({ posts }: { posts: any[] }) {
  const t = useTranslations('Map');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-full bg-surface-container-low animate-pulse rounded-xl"></div>;

  const validMarkers = posts
    .map(post => {
      const translation = post.post_translations?.[0];
      const metadata = translation?.metadata;
      if (metadata?.coordinates?.lat && metadata?.coordinates?.lng) {
        return {
          id: post.id,
          slug: post.slug,
          category: post.category,
          title: translation.title,
          description: translation.description,
          imageUrl: post.image_url,
          lat: metadata.coordinates.lat,
          lng: metadata.coordinates.lng,
          idols: metadata.idols || []
        };
      }
      return null;
    })
    .filter(Boolean);

  const defaultCenter: [number, number] = [35.158, 129.172]; // Default to Busan Haeundae

  return (
    <div className="w-full h-full relative" style={{ zIndex: 0 }}>
      <MapContainer 
        center={defaultCenter} 
        zoom={11} 
        scrollWheelZoom={true} 
        className="w-full h-full rounded-xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {validMarkers.map((marker: any) => (
          <Marker 
            key={marker.id} 
            position={[marker.lat, marker.lng]}
            icon={customIcon}
          >
            <Popup className="custom-popup">
              <div className="flex flex-col gap-2 min-w-[200px]">
                {marker.imageUrl && (
                  <div className="relative w-full h-24 rounded-lg overflow-hidden mb-1">
                    <Image 
                      src={marker.imageUrl} 
                      alt={marker.title} 
                      fill 
                      className="object-cover" 
                      sizes="200px"
                    />
                  </div>
                )}
                <div>
                  <span className="text-[10px] font-label-bold px-2 py-0.5 bg-primary-container text-on-primary-container rounded-full uppercase tracking-wider mb-1 inline-block">
                    {marker.category}
                  </span>
                  {marker.idols && marker.idols.length > 0 && (
                     <div className="flex gap-1 flex-wrap mb-1">
                       {marker.idols.map((idol: string) => (
                         <span key={idol} className="text-[9px] font-label-bold px-1.5 py-0.5 bg-secondary-container text-on-secondary-container rounded-full">
                           #{idol}
                         </span>
                       ))}
                     </div>
                  )}
                  <div className="font-label-bold text-[14px] text-gray-900 leading-tight">{marker.title}</div>
                </div>
                <Link 
                  href={`/blog/${marker.slug}`} 
                  className="mt-2 block text-center bg-primary !text-white py-1.5 rounded-lg font-label-bold text-[12px] hover:bg-primary/90 transition-colors"
                >
                  {t('view_post')}
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
        <MapBoundsUpdater markers={validMarkers} />
      </MapContainer>
    </div>
  );
}
