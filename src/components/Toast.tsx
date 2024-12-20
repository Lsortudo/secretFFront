import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ToastProps {
  show: boolean;
  message: string;
}

export function Toast({ show, message }: ToastProps) {
  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2 bg-white/90 text-[#6741d9] px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm animate-fade-in">
      <AlertCircle className="w-5 h-5" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}