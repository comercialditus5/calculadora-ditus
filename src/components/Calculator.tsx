import React, { useState } from 'react';
import { ServiceSection } from './ServiceSection';
import { Summary } from './Summary';
import { BudgetDetails } from './BudgetDetails';
import { PaymentOptions } from './PaymentOptions';
import { RecurringPaymentOptions } from './RecurringPaymentOptions';
import { ClientInfoForm } from './ClientInfoForm';
import { TransportCalculator } from './TransportCalculator';
import { servicesData } from '../data/servicesData';
import { SelectedService, PaymentMethod, RecurringPayment, ClientInfo, TransportInfo } from '../types';

export const Calculator: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [showBudgetDetails, setShowBudgetDetails] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: 'pix',
    installments: 1
  });
  const [recurringPayment, setRecurringPayment] = useState<RecurringPayment>({
    method: 'pix',
    dueDate: 5
  });
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    businessName: '',
    contactName: '',
    whatsapp: ''
  });
  const [transport, setTransport] = useState<TransportInfo>({
    distance: 0,
    cost: 0,
    days: 1
  });

  const toggleService = (service: SelectedService) => {
    const existingIndex = selectedServices.findIndex(
      s => s.id === service.id && s.category === service.category
    );

    if (existingIndex >= 0) {
      setSelectedServices(prev => prev.filter((_, index) => index !== existingIndex));
    } else {
      setSelectedServices(prev => [...prev, service]);
    }
  };

  const updateServiceOptions = (serviceId: string, category: string, options: Record<string, any>) => {
    setSelectedServices(prev => 
      prev.map(service => 
        service.id === serviceId && service.category === category 
          ? { ...service, options } 
          : service
      )
    );
  };

  const hasRecurringServices = selectedServices.some(service => service.prices.monthly > 0);
  const hasOnSiteServices = selectedServices.some(service => 
    ['professional-videos', 'professional-photos', 'drone-recording', 'presential-sales-training'].includes(service.id)
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
          Orçamento Personalizado
        </h2>
        <p className="text-white/80">
          Selecione os serviços desejados para calcular o investimento em sua empresa
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Service Sections */}
          {servicesData.map((category) => (
            <ServiceSection
              key={category.id}
              category={category}
              selectedServices={selectedServices}
              toggleService={toggleService}
              updateServiceOptions={updateServiceOptions}
            />
          ))}

          {/* Client Info Form */}
          <ClientInfoForm 
            clientInfo={clientInfo}
            setClientInfo={setClientInfo}
          />

          {/* Transport Calculator */}
          {hasOnSiteServices && (
            <TransportCalculator
              transport={transport}
              setTransport={setTransport}
            />
          )}
        </div>
        
        <div className="md:col-span-1">
          {/* Summary - Sticky at top */}
          <div className="sticky top-20 z-40 mb-6">
            <Summary 
              selectedServices={selectedServices} 
              paymentMethod={paymentMethod}
              clientInfo={clientInfo}
              recurringPayment={recurringPayment}
              transport={transport}
              showBudgetDetails={() => setShowBudgetDetails(true)}
            />
          </div>
          
          {/* Static content below - this will scroll normally */}
          <div className="space-y-6">
            {/* Payment Options - Completely static */}
            <PaymentOptions 
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
            
            {/* Recurring Payment Options - Completely static */}
            {hasRecurringServices && (
              <RecurringPaymentOptions
                recurringPayment={recurringPayment}
                setRecurringPayment={setRecurringPayment}
                hasRecurringServices={hasRecurringServices}
              />
            )}
          </div>
        </div>
      </div>

      {/* Budget Details Modal */}
      {showBudgetDetails && (
        <BudgetDetails
          selectedServices={selectedServices}
          paymentMethod={paymentMethod}
          clientInfo={clientInfo}
          recurringPayment={recurringPayment}
          transport={transport}
          onClose={() => setShowBudgetDetails(false)}
        />
      )}
    </div>
  );
};