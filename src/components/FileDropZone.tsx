import React from 'react';
import { Upload, Plus } from 'lucide-react';

interface FileDropZoneProps {
  isDragging: boolean;
  files: string[];
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onClick: () => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export function FileDropZone({ 
  isDragging,
  files,
  onDragOver, 
  onDragLeave, 
  onDrop,
  onClick,
  onFileSelect,
  fileInputRef
}: FileDropZoneProps) {
  const lastFile = files[files.length - 1];
  
  return (
    <>
      <div
        onClick={onClick}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`
          mt-8 p-8 border-2 border-dashed rounded-lg text-center transition-all duration-200 cursor-pointer
          ${isDragging 
            ? 'border-white bg-white/10' 
            : 'border-white/40 hover:border-white/60 hover:bg-white/5'
          }
        `}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-white/10 rounded-full">
            {isDragging ? (
              <Upload className="w-8 h-8 text-white" />
            ) : (
              <Plus className="w-8 h-8 text-white/70" />
            )}
          </div>
          <div>
            <p className="text-sm text-white/80">
              {lastFile || 'Click or drag and drop .txt files here'}
            </p>
          </div>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt"
        onChange={onFileSelect}
        className="hidden [&::file-selector-button]:hidden"
        multiple
      />
    </>
  );
}