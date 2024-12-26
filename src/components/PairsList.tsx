import React from 'react';
import type { Pair } from '../types/pairs';

interface PairsListProps {
  pairs: Pair[];
}

export function PairsList({ pairs }: PairsListProps) {
  if (!pairs || !pairs.length) return null;
  
  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-sm font-medium text-white/90 text-center">
        Sorted Pairs
      </h3>
      <div className="space-y-2">
        {pairs.map((pair, index) => (
          <div 
            key={index}
            className="px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
          >
            <p className="text-center text-white/80">
              {pair.pair1} & {pair.pair2}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}