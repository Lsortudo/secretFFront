import React from 'react';

interface PairsListProps {
  pairs: string[][];
}

export function PairsList({ pairs }: PairsListProps) {
  if (!pairs || !pairs.length) return null;
  
  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-sm font-medium text-white/90 text-center">
        Sorted Pairs
      </h3>
      <div className="space-y-2">
        {pairs.map((pair, index) => {
          // Ensure pair is an array before using join
          if (!Array.isArray(pair)) {
            console.error('Invalid pair format:', pair);
            return null;
          }
          
          return (
            <div 
              key={index}
              className="px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
            >
              <p className="text-center text-white/80">
                {pair.join(' & ')}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}