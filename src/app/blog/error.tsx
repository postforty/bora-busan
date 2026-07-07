'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Blog Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-container-margin-mobile">
      <div className="bg-error-container text-on-error-container p-8 rounded-2xl max-w-md w-full text-center editorial-card-shadow">
        <span className="material-symbols-outlined text-5xl mb-4">error</span>
        <h2 className="font-headline-sm mb-4">Something went wrong!</h2>
        <p className="text-body-md mb-8 opacity-80">
          We couldn&apos;t load the content you were looking for. 
        </p>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="bg-primary text-on-primary px-6 py-3 rounded-xl font-label-bold hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
