'use client';

import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useState } from 'react';

// Dynamically import the editor with SSR disabled
// This prevents the huge bundle size from affecting the initial page load
// and avoids hydration mismatches since the editor uses browser APIs.
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] bg-surface-container-low border border-outline-variant/30 rounded-xl animate-pulse flex items-center justify-center">
        <span className="text-on-surface-variant font-label-bold">Loading Editor...</span>
      </div>
    )
  }
);

interface MarkdownEditorProps {
  initialValue?: string;
  onChange?: (value: string | undefined) => void;
}

export default function MarkdownEditor({ initialValue = '', onChange }: MarkdownEditorProps) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (val: string | undefined) => {
    setValue(val || '');
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <div data-color-mode="light" className="w-full">
      <MDEditor
        value={value}
        onChange={handleChange}
        height={500}
        preview="live"
        className="rounded-xl overflow-hidden shadow-sm"
      />
    </div>
  );
}
