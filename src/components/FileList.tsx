import React from 'react';

interface FileListProps {
  files: string[];
}

export function FileList({ files }: FileListProps) {
  if (files.length === 0) return null;

  // botar last selected file apenas
  const lastFile = files[files.length - 1];

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-white/90 mb-2 text-center">
        Selected File
      </h3>
      <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-sm text-white/80 text-center">
        {lastFile}
      </div>
    </div>
  );
}