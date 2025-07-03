import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b0613] py-6 mt-8">
      <div className="container mx-auto px-4 text-center text-white/80 text-sm">
        <p className="mb-2">Ditus Marketing - Av. Paulista, 1636, sala 1504, São Paulo - SP, CEP 01310-200</p>
        <p className="mb-4">© 2025 Ditus Marketing. Todos os direitos reservados.</p>
        <p className="text-xs">Orçamento válido por 10 dias. A entrada é paga no 1º mês; as mensalidades começam no 2º mês.</p>
      </div>
    </footer>
  );
};