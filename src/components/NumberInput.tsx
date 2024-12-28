import React from 'react';

interface NumberInputProps {
  value: string;
}

export function NumberInput({ value }: NumberInputProps) {
  return (
    <div className="space-y-2 text-center">
      <label 
        htmlFor="number" 
        className="block text-xl font-bold text-white mb-2"
      >
        Código do Sorteio
      </label>
      <div className="bg-white/10 backdrop-blur-sm rounded-xl border-2 border-white/20 p-4">
        <span className="text-3xl font-mono tracking-wider text-white">
          {value ? value.split('').join(' ') : '• • • • •'}
        </span>
      </div>
    </div>
  );
}