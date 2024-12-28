import React, { useState, useEffect } from 'react';
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

  // evitar chamadas repetidas
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    if (number && isSorting) {
      handleSort(number);
      setIsSorting(false); // Reseta o estado para evitar novas chamadas
    }
  }, [number, isSorting, handleSort]); // Agora o sort só acontece quando `isSorting` for `true`.

  const handleSortClick = () => {
    if (!isSorting) { // Verifica se a ordenação já está em andamento
      generateRandomNumber(); // Gera um número aleatório
      setIsSorting(true); // Marca que o processo de ordenação foi iniciado
    }
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
