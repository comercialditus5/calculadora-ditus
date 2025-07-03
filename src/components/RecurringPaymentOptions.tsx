import React from 'react';
import { RecurringPayment } from '../types';

interface RecurringPaymentOptionsProps {
  recurringPayment: RecurringPayment;
  setRecurringPayment: React.Dispatch<React.SetStateAction<RecurringPayment>>;
  hasRecurringServices: boolean;
}

export const RecurringPaymentOptions: React.FC<RecurringPaymentOptionsProps> = ({
  recurringPayment,
  setRecurringPayment,
  hasRecurringServices
}) => {
  if (!hasRecurringServices) return null;

  return (
    <div className="bg-gradient-to-br from-[#2a1333] to-[#1a0c20] rounded-lg shadow-lg p-6">
      <h4 className="text-lg font-semibold mb-4 text-white">Pagamentos Mensais Recorrentes</h4>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Forma de Pagamento
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['pix', 'boleto', 'credit'] as const).map((method) => (
              <button
                key={method}
                className={`py-2 px-3 rounded text-sm font-medium transition-all ${
                  recurringPayment.method === method
                    ? 'bg-[#5C005C] text-white'
                    : 'bg-gray-800/50 text-white/70 hover:bg-gray-800'
                }`}
                onClick={() => setRecurringPayment(prev => ({ ...prev, method }))}
              >
                {method === 'pix' ? 'PIX' : 
                 method === 'boleto' ? 'Boleto' : 
                 'Cartão'}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Dia de Vencimento
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[5, 10, 15, 20, 25].map((day) => (
              <button
                key={day}
                className={`py-2 px-3 rounded text-sm font-medium transition-all ${
                  recurringPayment.dueDate === day
                    ? 'bg-[#5C005C] text-white'
                    : 'bg-gray-800/50 text-white/70 hover:bg-gray-800'
                }`}
                onClick={() => setRecurringPayment(prev => ({ ...prev, dueDate: day as 5 | 10 | 15 | 20 | 25 }))}
              >
                Dia {day}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <p className="mt-4 text-sm text-white/60">
        Pagamentos mensais não têm acréscimo de juros
      </p>
    </div>
  );
};