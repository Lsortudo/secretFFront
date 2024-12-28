import React from 'react';
import type { Pair } from '../../types';
import { PairItem } from './PairItem';
import { Users } from 'lucide-react';

interface PairsListProps {
  pairs: Pair[];
}

export function PairsList({ pairs }: PairsListProps) {
  if (!pairs?.length) return null;
  
  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-center gap-2 text-white/90">
        <Users className="w-5 h-5" />
        <h3 className="text-lg font-semibold">
          Duplas Sorteadas
        </h3>
      </div>
      <div className="space-y-3 mt-4">
        {pairs.map((pair, index) => (
          <PairItem key={index} pair={pair} index={index} />
        ))}
      </div>
    </div>
  );
}