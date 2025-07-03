import React from 'react';
import { ClientInfo } from '../types';

interface ClientInfoFormProps {
  clientInfo: ClientInfo;
  setClientInfo: React.Dispatch<React.SetStateAction<ClientInfo>>;
}

export const ClientInfoForm: React.FC<ClientInfoFormProps> = ({
  clientInfo,
  setClientInfo
}) => {
  return (
    <div className="bg-gradient-to-br from-[#2a1333] to-[#1a0c20] rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4 text-white">Informações do Cliente</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/90 mb-1">
            Nome do Negócio
          </label>
          <input
            type="text"
            className="w-full bg-[#1a0c20] border border-gray-700 rounded px-3 py-2 text-white"
            value={clientInfo.businessName}
            onChange={(e) => setClientInfo(prev => ({
              ...prev,
              businessName: e.target.value
            }))}
            placeholder="Nome da sua empresa"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white/90 mb-1">
            Seu Nome
          </label>
          <input
            type="text"
            className="w-full bg-[#1a0c20] border border-gray-700 rounded px-3 py-2 text-white"
            value={clientInfo.contactName}
            onChange={(e) => setClientInfo(prev => ({
              ...prev,
              contactName: e.target.value
            }))}
            placeholder="Seu nome completo"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white/90 mb-1">
            WhatsApp
          </label>
          <input
            type="tel"
            className="w-full bg-[#1a0c20] border border-gray-700 rounded px-3 py-2 text-white"
            value={clientInfo.whatsapp}
            onChange={(e) => setClientInfo(prev => ({
              ...prev,
              whatsapp: e.target.value
            }))}
            placeholder="(11) 99999-9999"
          />
        </div>
      </div>
      
      <p className="mt-4 text-sm text-white/60 italic">
        Estas informações são opcionais e serão usadas apenas para personalizar seu orçamento
      </p>
    </div>
  );
};