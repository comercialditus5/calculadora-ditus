import React, { useRef } from 'react';
import { X, Printer, Mail, Download, Send } from 'lucide-react';
import { SelectedService, PaymentMethod, ClientInfo, RecurringPayment, TransportInfo } from '../types';
import { calculateTotals, calculateFees, calculateInstallmentValue } from '../utils/calculations';
import { getCategoryById } from '../data/servicesData';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface BudgetDetailsProps {
  selectedServices: SelectedService[];
  paymentMethod: PaymentMethod;
  clientInfo: ClientInfo;
  recurringPayment: RecurringPayment;
  transport: TransportInfo;
  onClose: () => void;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 20,
    borderBottom: '1 solid #ccc',
    paddingBottom: 10
  },
  title: {
    fontSize: 20,
    marginBottom: 10
  },
  clientInfo: {
    marginBottom: 20
  },
  service: {
    marginBottom: 10
  },
  totals: {
    marginTop: 20,
    borderTop: '1 solid #ccc',
    paddingTop: 10
  }
});

const BudgetPDF = ({ selectedServices, clientInfo, totals }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Orçamento Ditus Marketing</Text>
        <Text>Data: {new Date().toLocaleDateString('pt-BR')}</Text>
      </View>
      
      <View style={styles.clientInfo}>
        <Text>Negócio: {clientInfo.businessName}</Text>
        <Text>Nome: {clientInfo.contactName}</Text>
        <Text>WhatsApp: {clientInfo.whatsapp}</Text>
      </View>
      
      {selectedServices.map((service: SelectedService, index: number) => (
        <View key={index} style={styles.service}>
          <Text>{service.name}</Text>
          {service.prices.entry > 0 && (
            <Text>Entrada: R$ {service.prices.entry.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</Text>
          )}
          {service.prices.monthly > 0 && (
            <Text>Mensal: R$ {service.prices.monthly.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</Text>
          )}
          {service.prices.oneTime > 0 && (
            <Text>Único: R$ {service.prices.oneTime.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</Text>
          )}
        </View>
      ))}
      
      <View style={styles.totals}>
        <Text>Total Entrada: R$ {totals.uniqueTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</Text>
        <Text>Total Mensal: R$ {totals.monthlyTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</Text>
      </View>
    </Page>
  </Document>
);

export const BudgetDetails: React.FC<BudgetDetailsProps> = ({
  selectedServices,
  paymentMethod,
  clientInfo,
  recurringPayment,
  transport,
  onClose
}) => {
  const totals = calculateTotals(selectedServices);
  const totalUnique = totals.uniqueTotal + (transport.cost * transport.days);
  const totalWithFees = calculateFees(totalUnique, paymentMethod);
  const installmentValue = paymentMethod.type === 'credit' && paymentMethod.installments > 1
    ? calculateInstallmentValue(totalUnique, paymentMethod.installments)
    : 0;

  const formatWhatsAppMessage = () => {
    let message = "Olá, tenho interesse nesse orçamento\n\n";
    
    if (clientInfo.businessName) {
      message += `*Negócio:* ${clientInfo.businessName}\n`;
    }
    if (clientInfo.contactName) {
      message += `*Nome:* ${clientInfo.contactName}\n`;
    }
    if (clientInfo.whatsapp) {
      message += `*WhatsApp:* ${clientInfo.whatsapp}\n`;
    }
    
    message += "\n*Serviços Selecionados:*\n";
    selectedServices.forEach(service => {
      message += `\n*${service.name}*`;
      if (service.prices.entry > 0) {
        message += `\nEntrada: R$ ${service.prices.entry.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
      }
      if (service.prices.monthly > 0) {
        message += `\nMensal: R$ ${service.prices.monthly.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
      }
      if (service.prices.oneTime > 0) {
        message += `\nÚnico: R$ ${service.prices.oneTime.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
      }
    });
    
    message += "\n\n*Totais:*";
    message += `\n*Total Entrada:* R$ ${totals.uniqueTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    message += `\n*Total Mensal:* R$ ${totals.monthlyTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    
    return encodeURIComponent(message);
  };

  const formatEmailBody = () => {
    let body = `Orçamento Ditus Marketing\n\n`;
    
    if (clientInfo.businessName) {
      body += `Negócio: ${clientInfo.businessName}\n`;
    }
    if (clientInfo.contactName) {
      body += `Nome: ${clientInfo.contactName}\n`;
    }
    if (clientInfo.whatsapp) {
      body += `WhatsApp: ${clientInfo.whatsapp}\n`;
    }
    
    body += "\nServiços Selecionados:\n";
    selectedServices.forEach(service => {
      body += `\n${service.name}`;
      if (service.prices.entry > 0) {
        body += `\nEntrada: R$ ${service.prices.entry.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
      }
      if (service.prices.monthly > 0) {
        body += `\nMensal: R$ ${service.prices.monthly.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
      }
      if (service.prices.oneTime > 0) {
        body += `\nÚnico: R$ ${service.prices.oneTime.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
      }
    });
    
    body += "\n\nTotais:";
    body += `\nTotal Entrada: R$ ${totals.uniqueTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    body += `\nTotal Mensal: R$ ${totals.monthlyTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    
    return encodeURIComponent(body);
  };

  // Handle click outside to close modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-white sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-gray-800">Detalhes do Orçamento</h2>
          
          <div className="flex items-center space-x-3">
            <a
              href={`https://wa.me/5511914702496?text=${formatWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              <Send size={16} className="mr-2" />
              WhatsApp
            </a>
            
            <a
              href={`mailto:comercial@ditus.com.br?subject=NOVO ORÇAMENTO&body=${formatEmailBody()}`}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              <Mail size={16} className="mr-2" />
              E-mail
            </a>
            
            <PDFDownloadLink
              document={<BudgetPDF selectedServices={selectedServices} clientInfo={clientInfo} totals={totals} />}
              fileName="orcamento-ditus.pdf"
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              {({ loading }) => (
                <>
                  <Download size={16} className="mr-2" />
                  {loading ? 'Gerando...' : 'PDF'}
                </>
              )}
            </PDFDownloadLink>

            <button
              onClick={onClose}
              className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-[#5C005C] mb-1">Ditus Marketing</h1>
              <p className="text-xl font-medium text-gray-800">Orçamento Personalizado</p>
              <p className="text-gray-800 mt-2">
                Data: {new Date().toLocaleDateString('pt-BR')} | Válido até: {new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}
              </p>
            </div>
            
            {selectedServices.length > 0 ? (
              <>
                <div className="space-y-6 mb-8">
                  {Array.from(new Set(selectedServices.map(s => s.category))).map(categoryId => {
                    const categoryServices = selectedServices.filter(s => s.category === categoryId);
                    const category = getCategoryById(categoryId);
                    
                    return (
                      <div key={categoryId} className="border-b pb-4">
                        <h3 className="font-semibold text-lg text-[#5C005C] mb-3 flex items-center">
                          <span className="mr-2">{category?.icon}</span>
                          {category?.name || categoryId}
                        </h3>
                        
                        {categoryServices.map((service, index) => (
                          <div key={index} className="mb-4">
                            <div className="flex justify-between mb-2">
                              <span className="font-medium text-gray-800">{service.name}</span>
                              <div className="text-right">
                                {service.prices.oneTime > 0 && (
                                  <div className="text-gray-800">
                                    R$ {service.prices.oneTime.toLocaleString('pt-BR', {minimumFractionDigits: 2})} <span className="text-gray-600 text-sm">único</span>
                                  </div>
                                )}
                                
                                {service.prices.entry > 0 && (
                                  <div className="text-gray-800">
                                    R$ {service.prices.entry.toLocaleString('pt-BR', {minimumFractionDigits: 2})} <span className="text-gray-600 text-sm">entrada</span>
                                  </div>
                                )}
                                
                                {service.prices.monthly > 0 && (
                                  <div className="text-gray-800">
                                    R$ {service.prices.monthly.toLocaleString('pt-BR', {minimumFractionDigits: 2})} <span className="text-gray-600 text-sm">/mês</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {Object.keys(service.options).length > 0 && (
                              <div className="ml-4 text-sm text-gray-600">
                                {Object.entries(service.options).map(([key, value]) => (
                                  <div key={key} className="flex justify-between">
                                    <span>{key}: {Array.isArray(value) ? value.join(', ') : value}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-800">Total entrada:</span>
                      <span className="font-medium text-gray-800">
                        {totals.uniqueTotal > 0 
                          ? `R$ ${totals.uniqueTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}` 
                          : '-'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-800">Valor mensal:</span>
                      <span className="font-medium text-gray-800">
                        {totals.monthlyTotal > 0 
                          ? `R$ ${totals.monthlyTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}/mês` 
                          : '-'}
                      </span>
                    </div>

                    {totals.paidTrafficTotal > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-800">Tráfego pago:</span>
                        <span className="font-medium text-gray-800">
                          R$ {totals.paidTrafficTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}/mês
                        </span>
                      </div>
                    )}

                    {transport.cost > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-800">Transporte ({transport.days} {transport.days === 1 ? 'dia' : 'dias'}):</span>
                        <span className="font-medium text-gray-800">
                          R$ {(transport.cost * transport.days).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-300 pt-4 space-y-3">
                    <div className="flex justify-between font-medium text-gray-800">
                      <span>Total entrada:</span>
                      <span>R$ {totalUnique.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                    </div>
                    
                    {paymentMethod.type === 'credit' && paymentMethod.installments > 1 && (
                      <div className="flex justify-between text-[#5C005C] font-medium">
                        <span>
                          Parcelado em {paymentMethod.installments}x de:
                        </span>
                        <span>
                          R$ {installmentValue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                        </span>
                      </div>
                    )}
                    
                    {totals.monthlyTotal > 0 && (
                      <div className="flex justify-between font-medium text-gray-800">
                        <span>Mensal recorrente:</span>
                        <span>
                          R$ {totals.monthlyTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 text-gray-800">
                  <h4 className="font-semibold mb-2">Forma de Pagamento:</h4>
                  <p>
                    {paymentMethod.type === 'pix' ? (
                      "Pix (sem juros)"
                    ) : (
                      paymentMethod.installments === 1 
                        ? "Cartão de Crédito à vista" 
                        : `Cartão de Crédito em ${paymentMethod.installments}x`
                    )}
                  </p>
                  
                  <h4 className="font-semibold mt-4 mb-2">Observações:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Orçamento válido por 10 dias.</li>
                    <li>A entrada é paga no 1º mês; as mensalidades começam no 2º mês.</li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Nenhum serviço selecionado.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};