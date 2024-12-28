import { useState } from 'react';

export function useNumberInput() {
  const [number, setNumber] = useState('');

  const generateRandomNumber = () => {
    const randomNum = String(Math.floor(10000 + Math.random() * 90000)).padStart(5, '0');
    setNumber(randomNum);
  };

  return { number, setNumber, generateRandomNumber }; // Retorne a função setNumber também
}
