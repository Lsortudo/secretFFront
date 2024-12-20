import React from 'react';
import { Shuffle } from 'lucide-react';

interface SortButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function SortButton({ onClick, disabled }: SortButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        mt-6 px-6 py-3 rounded-lg font-medium
        flex items-center justify-center gap-2
        transition-all duration-200
        ${disabled 
          ? 'bg-white/20 text-white/50 cursor-not-allowed' 
          : 'bg-white/10 text-white hover:bg-white/20'
        }
      `}
    >
      <Shuffle className="w-5 h-5" />
      Sortear
    </button>
  );
}