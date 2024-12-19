import { useState, ChangeEvent } from 'react';

export function useNumberInput() {
  const [number, setNumber] = useState('');

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 5 && /^\d*$/.test(value)) {
      setNumber(value);
    }
  };

  return { number, handleNumberChange };
}