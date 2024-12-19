import React from 'react';
import { NumberInput } from './components/NumberInput';
import { FileDropZone } from './components/FileDropZone';
import { FileList } from './components/FileList';
import { useFileHandling } from './hooks/useFileHandling';
import { useNumberInput } from './hooks/useNumberInput';

export default function App() {
  const { number, handleNumberChange } = useNumberInput();
  const { 
    files, 
    isDragging, 
    fileInputRef,
    handleDragOver, 
    handleDragLeave, 
    handleDrop,
    handleClick,
    handleFileSelect
  } = useFileHandling();

  return (
    <div className="min-h-screen bg-[#6741d9] flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <NumberInput value={number} onChange={handleNumberChange} />
        <FileDropZone
          isDragging={isDragging}
          files={files}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          onFileSelect={handleFileSelect}
          fileInputRef={fileInputRef}
        />
        <FileList files={files} />
      </div>
    </div>
  );
}