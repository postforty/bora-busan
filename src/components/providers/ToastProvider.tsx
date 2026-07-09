'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: '#ffffff',
          color: '#1a1c1e',
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(30,41,59,0.12)',
          padding: '16px 24px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 700,
          border: '1px solid rgba(116, 119, 127, 0.3)'
        },
        success: {
          iconTheme: {
            primary: '#7c4dff', // BoraBusan Primary
            secondary: '#ffffff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ba1a1a', // Error color
            secondary: '#ffffff',
          },
        },
      }}
    />
  );
}
