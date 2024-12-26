import React from 'react';

interface NumberInputProps {
  value: string;
}

export function NumberInput({ value }: NumberInputProps) {
  return (
    <div className="space-y-2 text-center">
      <label 
        htmlFor="number" 
        className="block text-lg font-medium text-white"
      >
        Your 5 digit code
      </label>
      <input
        type="text"
        id="number"
        value={value}
        readOnly
        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg 
                 text-lg text-center text-white/70 placeholder-white/30
                 cursor-not-allowed select-none
                 transition-all duration-200
                 focus:ring-0 focus:outline-none"
        placeholder="•••••"
      />
    </div>
  );
}