import React from 'react';
import type { Pair } from '../../types';
import { PairItem } from './PairItem';

interface PairsListProps {
  pairs: Pair[];
}

export function PairsList({ pairs }: PairsListProps) {
  if (!pairs?.length) return null;
  
  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-sm font-medium text-white/90 text-center">
        Sorted Pairs
      </h3>
      <div className="space-y-2">
        {pairs.map((pair, index) => (
          <PairItem key={index} pair={pair} />
        ))}
      </div>
    </div>
  );
}