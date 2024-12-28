import React, { useState, useEffect } from 'react';
import { NumberInput } from './components/NumberInput';
import { FileDropZone } from './components/FileDropZone';
import { PairsList } from './components/PairsList';
import { SortButton } from './components/SortButton';
import { Toast } from './components/Toast';
import { useFileHandling } from './hooks/useFileHandling';
import { useNumberInput } from './hooks/useNumberInput';
import { useToast } from './hooks/useToast';
import { CodeVerification } from './components/CodeVerification';
import { verifyCode } from './services/api/verify.service';

export default function App() {
  const { number, setNumber, generateRandomNumber } = useNumberInput(); 
  const { showToast, message, showMessage } = useToast();
  const [pairs, setPairs] = useState<any[]>([]);  // Agora temos `pairs` e `setPairs`
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSorting, setIsSorting] = useState(false);

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
  } = useFileHandling((newPairs: any[]) => setPairs(newPairs), pairs);  // Passa `setPairs` e o estado `pairs`

  useEffect(() => {
    if (number && isSorting) {
      handleSort(number);
      setIsSorting(false);
    }
  }, [number, isSorting, handleSort]);

  const handleSortClick = () => {
    if (!isSorting) {
      generateRandomNumber();
      setIsSorting(true);
    }
  };

  const handleVerify = async (code: string) => {
    try {
      setIsVerifying(true);
      const result = await verifyCode(code);
      setPairs(result.pairs);
      setNumber(result.code); // Agora você pode atualizar o number
      showMessage('Código verificado com sucesso!');
    } catch (error) {
      showMessage('Código inválido ou erro no servidor');
    } finally {
      setIsVerifying(false);
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
        <CodeVerification onVerify={handleVerify} isLoading={isVerifying} />
        <PairsList pairs={pairs} />
      </div>
      <Toast show={showToast} message={message} />
    </div>
  );
}
