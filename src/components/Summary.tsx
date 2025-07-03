import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SelectedService, PaymentMethod, ClientInfo, RecurringPayment, TransportInfo } from '../types';
import { calculateTotals, calculateFees, calculateInstallmentValue } from '../utils/calculations';

interface SummaryProps {
  selectedServices: SelectedService[];
  paymentMethod: PaymentMethod;
  clientInfo: ClientInfo;
  recurringPayment: RecurringPayment;
  transport: TransportInfo;
  showBudgetDetails: () => void;
}

export const Summary: React.FC<SummaryProps> = ({
  selectedServices,
  paymentMethod,
  transport,
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

  return (
    <div className="bg-gradient-to-br from-[#3a0d44] to-[#1a0c20] rounded-lg shadow-lg p-6 sticky top-20 z-40">
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