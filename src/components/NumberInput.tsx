import React from 'react';

interface NumberInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function NumberInput({ value, onChange }: NumberInputProps) {
  return (
    <div className="space-y-2 text-center">
      <label 
        htmlFor="number" 
        className="block text-lg font-medium text-white"
      >
        Enter a 5-digit number
      </label>
      <input
        type="text"
        id="number"
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 text-lg text-center text-white placeholder-white/50"
        placeholder="00000"
      />
    </div>
  );
}