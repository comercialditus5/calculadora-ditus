import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#5C005C] to-[#3c0040] shadow-lg">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-2 md:mb-0">
          <img 
            src="/logotipo-ditus-marketing.png" 
            alt="Ditus Marketing" 
            className="h-6 md:h-8"
          />
        </div>
        <div className="text-center md:text-right">
          <h2 className="text-lg md:text-xl font-semibold text-white">Calculadora de Preços</h2>
          <p className="text-white/80 text-xs md:text-sm">Obtenha um orçamento personalizado para sua empresa</p>
        </div>
      </div>
    </header>
  );
};