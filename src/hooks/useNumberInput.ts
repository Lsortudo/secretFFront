import { useState } from 'react';

export function useNumberInput() {
  const [number, setNumber] = useState('');

  const generateRandomNumber = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000).toString();
    setNumber(randomNum);
  };

  return { number, generateRandomNumber };
}