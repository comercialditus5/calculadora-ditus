import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-[#5C005C] to-[#3c0040] shadow-lg">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <img 
            src="/logotipo-ditus-marketing.png" 
            alt="Ditus Marketing" 
            className="h-8 md:h-10 mr-3"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-white">Ditus Marketing</h1>
        </div>
        <div className="text-center md:text-right">
          <h2 className="text-xl md:text-2xl font-semibold text-white">Calculadora de Preços</h2>
          <p className="text-white/80 text-sm md:text-base">Obtenha um orçamento personalizado para sua empresa</p>
        </div>
      </div>
    </header>
  );
};