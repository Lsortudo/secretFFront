import React, { useEffect } from 'react';
import { NumberInput } from './components/NumberInput';
import { FileDropZone } from './components/FileDropZone';
import { PairsList } from './components/PairsList';
import { SortButton } from './components/SortButton';
import { Toast } from './components/Toast';
import { useFileHandling } from './hooks/useFileHandling';
import { useNumberInput } from './hooks/useNumberInput';
import { useToast } from './hooks/useToast';

export default function App() {
  const { number, generateRandomNumber } = useNumberInput();
  const { showToast, message, showMessage } = useToast();
  const { 
    files, 
    isDragging, 
    fileInputRef,
    pairs,
    handleDragOver, 
    handleDragLeave, 
    handleDrop,
    handleClick,
    handleFileSelect,
    handleSort
  } = useFileHandling(() => {
    showMessage('File selected successfully');
  });

  useEffect(() => {
    if (number) {
      handleSort(number);
    }
  }, [number, handleSort]); // Quando `number` mudar, chama `handleSort`.

  const handleSortClick = () => {
    generateRandomNumber(); // Gera o número aleatório, mas o envio será feito no `useEffect`.
  };

  return (
    <div className="min-h-screen bg-[#6741d9] flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <NumberInput value={number} />
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
          <SortButton onClick={handleSortClick} disabled={files.length === 0} />
        </div>
        <PairsList pairs={pairs} />
      </div>
      <Toast show={showToast} message={message} />
    </div>
  );
}
