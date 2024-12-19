import React from 'react';

interface FileListProps {
  files: string[];
}

export function FileList({ files }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-white/90 mb-2 text-center">
        Uploaded Files
      </h3>
      <ul className="space-y-2">
        {files.map((file, index) => (
          <li 
            key={index}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-sm text-white/80 text-center"
          >
            {file}
          </li>
        ))}
      </ul>
    </div>
  );
}