import React from 'react';
import type { Pair } from '../../types';

interface PairItemProps {
  pair: Pair;
  index: number;
}

export function PairItem({ pair, index }: PairItemProps) {
  return (
    <div className="px-6 py-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 transition-all duration-200 hover:bg-white/15">
      <div className="flex items-center gap-4">
        <span className="text-white/50 font-mono">#{(index + 1).toString().padStart(2, '0')}</span>
        <p className="text-white/90 font-medium">
          {pair.pair1} <span className="text-white/50 mx-2">&</span> {pair.pair2}
        </p>
      </div>
    </div>
  );
}