import { useState, useCallback, useRef } from 'react';

export function useFileHandling() {
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

    setFiles(prev => [...prev, ...textFiles]);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
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
    handleFileSelect
  };
}