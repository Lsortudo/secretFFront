import React from 'react';
import { NumberInput } from './components/NumberInput';
import { FileDropZone } from './components/FileDropZone';
import { FileList } from './components/FileList';
import { SortButton } from './components/SortButton';
import { Toast } from './components/Toast';
import { useFileHandling } from './hooks/useFileHandling';
import { useNumberInput } from './hooks/useNumberInput';
import { useToast } from './hooks/useToast';

export default function App() {
  const { number, handleNumberChange } = useNumberInput();
  const { showToast, message, showMessage } = useToast();
  const { 
    files, 
    isDragging, 
    fileInputRef,
    handleDragOver, 
    handleDragLeave, 
    handleDrop,
    handleClick,
    handleFileSelect,
    handleSort
  } = useFileHandling(() => {
    showMessage('Um arquivo foi selecionado');
  });

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
        <div className="flex justify-center">
          <SortButton onClick={handleSort} disabled={files.length === 0} />
        </div>
        <FileList files={files} />
      </div>
      <Toast show={showToast} message={message} />
    </div>
  );
}