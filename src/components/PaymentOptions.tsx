import React from 'react';
import { PaymentMethod } from '../types';
import { getCreditFeePercentage } from '../utils/calculations';

interface PaymentOptionsProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethod>>;
}

export const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  paymentMethod,
  setPaymentMethod
}) => {
  const handleTypeChange = (type: 'pix' | 'credit') => {
    setPaymentMethod({
      type,
      installments: type === 'credit' ? 1 : 1
    });
  };

  const handleInstallmentsChange = (installments: number) => {
    setPaymentMethod({
      ...paymentMethod,
      installments
    });
  };

  return (
    <div className="bg-gradient-to-br from-[#2a1333] to-[#1a0c20] rounded-lg shadow-lg p-6 sticky top-20 z-40">
      <h3 className="text-xl font-semibold mb-4 text-white">Opções de Pagamento</h3>
      
      <div className="mb-4">
        <div className="text-sm text-white/80 mb-2">Valores únicos e entradas:</div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            className={`py-2 rounded text-sm font-medium transition-all ${
              paymentMethod.type === 'pix'
                ? 'bg-[#5C005C] text-white'
                : 'bg-gray-800/50 text-white/70 hover:bg-gray-800'
            }`}
            onClick={() => handleTypeChange('pix')}
          >
            Pix (sem juros)
          </button>
          
          <button
            className={`py-2 rounded text-sm font-medium transition-all ${
              paymentMethod.type === 'credit'
                ? 'bg-[#5C005C] text-white'
                : 'bg-gray-800/50 text-white/70 hover:bg-gray-800'
            }`}
            onClick={() => handleTypeChange('credit')}
          >
            Cartão de Crédito
          </button>
        </div>
        
        {paymentMethod.type === 'credit' && (
          <div className="mb-4">
            <div className="text-sm text-white/80 mb-2">Parcelas:</div>
            
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
                <button
                  key={i}
                  className={`py-1.5 rounded text-sm font-medium transition-all ${
                    paymentMethod.installments === i
                      ? 'bg-[#5C005C] text-white'
                      : 'bg-gray-800/50 text-white/70 hover:bg-gray-800'
                  }`}
                  onClick={() => handleInstallmentsChange(i)}
                >
                  {i}x
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div>
        <div className="text-sm text-white/80 mb-2">Pagamentos recorrentes (sem juros):</div>
        <div className="bg-gray-800/30 rounded p-3 text-sm text-white/70">
          <p>Escolha entre: boleto/pix, cartão de débito ou crédito.</p>
          <p>Vencimentos disponíveis: dias 05, 10, 15, 20 ou 25.</p>
        </div>
      </div>
    </div>
  );
};