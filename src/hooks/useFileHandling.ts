import { useState, useCallback, useRef } from 'react';
import { sendFileToBackend } from '../services/api/pairs.service';
import type { Pair } from '../types';

export function useFileHandling(
  onFileSelect?: (pairs: Pair[]) => void, // Recebe a função para atualizar o estado de `pairs`
  pairs: Pair[] = [] // Recebe o estado de `pairs` do App.tsx
) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  }, []);

  const handleFiles = (fileList: File[]) => {
    const textFile = fileList.find(file => file.type === 'text/plain');
    
    if (textFile) {
      setFiles([textFile.name]);
      setSelectedFile(textFile);
      onFileSelect?.(pairs);  // Passa `pairs` diretamente
    }
  };

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleSort = async (code: string) => {
    if (!selectedFile || !code) {
      console.error('No file selected or code is empty');
      return;
    }

    try {
      const result = await sendFileToBackend(selectedFile, code);
      onFileSelect?.(result);  // Passa os pares recebidos do backend
    } catch (error) {
      console.error('Error during sorting:', error);
    }
  };

  return {
    files,
    isDragging,
    fileInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleClick,
    handleFileSelect,
    handleSort
  };
}
