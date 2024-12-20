import { useState, useCallback, useRef } from 'react';

export function useFileHandling(onFileSelect?: (filename: string) => void) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
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
    const textFiles = fileList
      .filter(file => file.type === 'text/plain')
      .map(file => file.name);

    if (textFiles.length > 0) {
      setFiles(prev => [...prev, ...textFiles]);
      onFileSelect?.(textFiles[textFiles.length - 1]);
    }
  };

  const handleClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleSort = () => {
    setFiles(prev => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
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