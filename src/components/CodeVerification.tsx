import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface CodeVerificationProps {
  onVerify: (code: string) => Promise<void>;
  isLoading?: boolean;
}

export function CodeVerification({ onVerify, isLoading = false }: CodeVerificationProps) {
  const [code, setCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 5) {
      await onVerify(code);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div className="flex flex-col items-center gap-4">
        <div className="w-full">
          <label 
            htmlFor="verification-code" 
            className="block text-sm font-medium text-white/90 mb-2 text-center"
          >
            Verificar código existente
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="verification-code"
              maxLength={5}
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Digite o código"
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg 
                       text-white placeholder-white/30
                       focus:outline-none focus:ring-2 focus:ring-white/30
                       transition-all duration-200"
            />
            <button
              type="submit"
              disabled={code.length !== 5 || isLoading}
              className={`px-4 py-2 rounded-lg flex items-center gap-2
                        transition-all duration-200
                        ${code.length === 5 && !isLoading
                          ? 'bg-white/20 text-white hover:bg-white/30'
                          : 'bg-white/10 text-white/50 cursor-not-allowed'}`}
            >
              <Search className="w-5 h-5" />
              Verificar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}