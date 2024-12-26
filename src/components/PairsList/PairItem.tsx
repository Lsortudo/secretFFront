import React from 'react';
import type { Pair } from '../../types';

interface PairItemProps {
  pair: Pair;
}

export function PairItem({ pair }: PairItemProps) {
  return (
    <div className="px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
      <p className="text-center text-white/80">
        {pair.pair1} & {pair.pair2}
      </p>
    </div>
  );
}