import { useState, useEffect } from 'react';

export function useToast() {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let timer: number;
    if (showToast) {
      timer = window.setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setShowToast(true);
  };

  return { showToast, message, showMessage };
}