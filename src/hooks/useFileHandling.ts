import { useState, useCallback, useRef } from 'react';
import { sendFileToBackend } from '../services/api';

export function useFileHandling(onFileSelect?: () => void) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pairs, setPairs] = useState<string[][]>([]);
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
      setPairs([]); // Clear previous pairs
      onFileSelect?.();
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

  const handleSort = async () => {
    if (!selectedFile) {
      return;
    }

    try {
      const result = await sendFileToBackend(selectedFile);
      setPairs(result);
    } catch (error) {
      console.error('Error during sorting:', error);
    }
  };

  return {
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
  };
}