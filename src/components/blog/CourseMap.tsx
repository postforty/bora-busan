'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { CourseStep } from './CourseTimeline';

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

export default function CourseMap({ steps }: { steps: CourseStep[] }) {
  const validSteps = steps.filter(step => step.coordinates && step.coordinates.lat && step.coordinates.lng);

  if (validSteps.length === 0) return null;

  // Calculate center (average of all points)
  const avgLat = validSteps.reduce((sum, step) => sum + step.coordinates!.lat, 0) / validSteps.length;
  const avgLng = validSteps.reduce((sum, step) => sum + step.coordinates!.lng, 0) / validSteps.length;

  const positions: [number, number][] = validSteps.map(step => [step.coordinates!.lat, step.coordinates!.lng]);

  return (
    <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-sm border border-outline-variant/30 relative" style={{ zIndex: 0 }}>
      <MapContainer 
        center={[avgLat, avgLng]} 
        zoom={12} 
        scrollWheelZoom={false} 
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {validSteps.map((step, idx) => (
          <Marker 
            key={idx} 
            position={[step.coordinates!.lat, step.coordinates!.lng]}
            icon={customIcon}
          >
            <Popup>
              <div className="font-label-bold text-[13px] text-gray-900">{idx + 1}. {step.place_name}</div>
              {step.time && <div className="text-[11px] text-gray-500 mt-1">{step.time}</div>}
            </Popup>
          </Marker>
        ))}
        {positions.length > 1 && (
          <Polyline positions={positions} color="#6750A4" weight={4} opacity={0.8} />
        )}
      </MapContainer>
    </div>
  );
}
