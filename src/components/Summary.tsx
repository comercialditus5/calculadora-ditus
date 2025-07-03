import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SelectedService, PaymentMethod, ClientInfo, RecurringPayment, TransportInfo } from '../types';
import { calculateTotals, calculateFees, calculateInstallmentValue, getCreditFeePercentage } from '../utils/calculations';

interface SummaryProps {
  selectedServices: SelectedService[];
  paymentMethod: PaymentMethod;
  clientInfo: ClientInfo;
  recurringPayment: RecurringPayment;
  transport: TransportInfo;
  hasRecurringServices: boolean;
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethod>>;
  setRecurringPayment: React.Dispatch<React.SetStateAction<RecurringPayment>>;
  showBudgetDetails: () => void;
}

export const Summary: React.FC<SummaryProps> = ({
  selectedServices,
  paymentMethod,
  transport,
  hasRecurringServices,
  setPaymentMethod,
  setRecurringPayment,
  recurringPayment,
  showBudgetDetails
}) => {
  const [totals, setTotals] = useState({
    uniqueTotal: 0,
    monthlyTotal: 0,
    paidTrafficTotal: 0,
    withFees: 0,
    installmentValue: 0
  });

  useEffect(() => {
    const calculatedTotals = calculateTotals(selectedServices);
    const totalWithTransport = calculatedTotals.uniqueTotal + (transport.cost * transport.days);
    const totalWithFees = calculateFees(totalWithTransport, paymentMethod);
    const installmentValue = calculateInstallmentValue(totalWithTransport, paymentMethod.installments);
    
    setTotals({
      uniqueTotal: totalWithTransport,
      monthlyTotal: calculatedTotals.monthlyTotal,
      paidTrafficTotal: calculatedTotals.paidTrafficTotal,
      withFees: totalWithFees,
      installmentValue: installmentValue
    });
  }, [selectedServices, paymentMethod, transport]);

  const handlePaymentTypeChange = (type: 'pix' | 'credit') => {
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
    <div className="bg-gradient-to-br from-[#3a0d44] to-[#1a0c20] rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-white">Resumo do Orçamento</h3>
      
      {selectedServices.length === 0 ? (
        <div className="text-center py-6 text-white/60">
          <p>Selecione serviços para visualizar o orçamento</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-white/80">Valor da entrada:</span>
              <span className="text-white font-medium">
                {totals.uniqueTotal > 0 
                  ? `R$ ${totals.uniqueTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}` 
                  : '-'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/80">Valor mensal:</span>
              <span className="text-white font-medium">
                {totals.monthlyTotal > 0 
                  ? `R$ ${totals.monthlyTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}/mês` 
                  : '-'}
              </span>
            </div>
            
            {totals.paidTrafficTotal > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-white/80">Tráfego pago:</span>
                <span className="text-white font-medium">
                  R$ {totals.paidTrafficTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}/mês
                </span>
              </div>
            )}

            {transport.cost > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-white/80">Transporte ({transport.days} {transport.days === 1 ? 'dia' : 'dias'}):</span>
                <span className="text-white font-medium">
                  R$ {(transport.cost * transport.days).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                </span>
              </div>
            )}
          </div>
          
          {/* Payment Options Section */}
          <div className="border-t border-white/10 pt-4 mb-6">
            <h4 className="text-lg font-semibold mb-3 text-white">Opções de Pagamento</h4>
            
            <div className="mb-4">
              <div className="text-sm text-white/80 mb-2">Valores únicos e entradas:</div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  className={`py-2 rounded text-sm font-medium transition-all ${
                    paymentMethod.type === 'pix'
                      ? 'bg-[#5C005C] text-white'
                      : 'bg-gray-800/50 text-white/70 hover:bg-gray-800'
                  }`}
                  onClick={() => handlePaymentTypeChange('pix')}
                >
                  Pix (sem juros)
                </button>
                
                <button
                  className={`py-2 rounded text-sm font-medium transition-all ${
                    paymentMethod.type === 'credit'
                      ? 'bg-[#5C005C] text-white'
                      : 'bg-gray-800/50 text-white/70 hover:bg-gray-800'
                  }`}
                  onClick={() => handlePaymentTypeChange('credit')}
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
            
            <div className="mb-4">
              <div className="text-sm text-white/80 mb-2">Pagamentos recorrentes (sem juros):</div>
              <div className="bg-gray-800/30 rounded p-3 text-sm text-white/70">
                <p>Escolha entre: boleto/pix, cartão de débito ou crédito.</p>
                <p>Vencimentos disponíveis: dias 05, 10, 15, 20 ou 25.</p>
              </div>
            </div>

            {/* Recurring Payment Options */}
            {hasRecurringServices && (
              <div className="border-t border-white/10 pt-4 mb-4">
                <h5 className="text-md font-semibold mb-3 text-white">Pagamentos Mensais Recorrentes</h5>
                
                <div className="space-y-3">
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
                
                <p className="mt-3 text-sm text-white/60">
                  Pagamentos mensais não têm acréscimo de juros
                </p>
              </div>
            )}
          </div>
          
          <div className="border-t border-white/10 pt-4 mb-6">
            {paymentMethod.type === 'credit' && paymentMethod.installments > 1 && (
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/90 font-medium">
                  Parcelado em {paymentMethod.installments}x de:
                </span>
                <span className="text-white font-semibold">
                  R$ {totals.installmentValue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                </span>
              </div>
            )}
          </div>
          
          <button
            onClick={showBudgetDetails}
            className="w-full bg-gradient-to-r from-[#5C005C] to-[#3a0d44] hover:from-[#6d026d] hover:to-[#4b1455] text-white py-3 rounded-lg font-medium flex items-center justify-center transition-all"
          >
            Ver detalhes do orçamento
            <ArrowRight size={18} className="ml-2" />
          </button>
        </>
      )}
    </div>
  );
};