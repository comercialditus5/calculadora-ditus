import React, { useState } from 'react';
import { Truck, Plus, Minus } from 'lucide-react';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { TransportInfo, Address } from '../types';
import { calculateTransportCost } from '../utils/calculations';

interface TransportCalculatorProps {
  transport: TransportInfo;
  setTransport: React.Dispatch<React.SetStateAction<TransportInfo>>;
}

const COMPANY_ADDRESS = 'Av. Paulista, 1636 - sala 1504 - Cerqueira César - São Paulo - SP';
const API_KEY = 'AIzaSyD7H4-t8-i_am8KMnQwoc0tjkgfWOwwsaY';

export const TransportCalculator: React.FC<TransportCalculatorProps> = ({
  transport,
  setTransport
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [address, setAddress] = useState<Address>({
    cep: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    country: 'Brasil'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAddressFromCEP = async (cep: string) => {
    try {
      setIsLoading(true);
      setError('');
      const formattedCEP = cep.replace(/\D/g, '');
      const response = await axios.get(`https://viacep.com.br/ws/${formattedCEP}/json/`);
      
      if (response.data.erro) {
        throw new Error('CEP não encontrado');
      }

      setAddress(prev => ({
        ...prev,
        street: response.data.logradouro,
        neighborhood: response.data.bairro,
        city: response.data.localidade,
        state: response.data.uf,
        country: 'Brasil'
      }));

      return true;
    } catch (err) {
      setError('CEP não encontrado');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const calculateDistance = async () => {
    try {
      setIsLoading(true);
      setError('');

      const origin = `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.state}`;
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(COMPANY_ADDRESS)}&key=${API_KEY}`
      );

      if (response.data.status === 'OK') {
        const distance = response.data.rows[0].elements[0].distance.value / 1000; // Convert to km
        const roundTripDistance = distance * 2;
        const cost = calculateTransportCost(roundTripDistance);
        
        setTransport(prev => ({
          ...prev,
          distance: roundTripDistance,
          cost: cost,
          days: 1 // Initialize with 1 day
        }));
      } else {
        throw new Error('Não foi possível calcular a distância');
      }
    } catch (err) {
      setError('Erro ao calcular a distância');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDaysChange = (increment: boolean) => {
    setTransport(prev => ({
      ...prev,
      days: increment ? prev.days + 1 : Math.max(1, prev.days - 1)
    }));
  };

  const handleDaysInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    setTransport(prev => ({
      ...prev,
      days: Math.max(1, value)
    }));
  };

  return (
    <div className="bg-gradient-to-br from-[#2a1333] to-[#1a0c20] rounded-lg shadow-lg transition-all duration-300 ease-in-out">
      <div 
        className="p-4 flex justify-between items-center cursor-pointer bg-gradient-to-r from-[#5C005C]/80 to-transparent hover:from-[#5C005C]"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <Truck className="mr-3 text-white" size={20} />
          <h3 className="text-xl font-semibold text-white">Transporte</h3>
        </div>
        {transport.cost > 0 && (
          <span className="text-sm bg-purple-600/20 text-purple-300 px-2 py-0.5 rounded">
            R$ {(transport.cost * transport.days).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
          </span>
        )}
      </div>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isExpanded ? 'max-h-[800px]' : 'max-h-0'
      }`}>
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              CEP
            </label>
            <InputMask
              mask="99999-999"
              value={address.cep}
              onChange={(e) => {
                setAddress(prev => ({ ...prev, cep: e.target.value }));
                if (e.target.value.replace(/\D/g, '').length === 8) {
                  fetchAddressFromCEP(e.target.value);
                }
              }}
              className="w-full bg-[#1a0c20] border border-gray-700 rounded px-3 py-2 text-white"
              placeholder="00000-000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              Endereço
            </label>
            <input
              type="text"
              value={address.street}
              readOnly
              className="w-full bg-[#1a0c20] border border-gray-700 rounded px-3 py-2 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">
                Número
              </label>
              <input
                type="text"
                value={address.number}
                onChange={(e) => setAddress(prev => ({ ...prev, number: e.target.value }))}
                className="w-full bg-[#1a0c20] border border-gray-700 rounded px-3 py-2 text-white"
                placeholder="123"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">
                Bairro
              </label>
              <input
                type="text"
                value={address.neighborhood}
                readOnly
                className="w-full bg-[#1a0c20] border border-gray-700 rounded px-3 py-2 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">
                Cidade
              </label>
              <input
                type="text"
                value={address.city}
                readOnly
                className="w-full bg-[#1a0c20] border border-gray-700 rounded px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">
                Estado
              </label>
              <input
                type="text"
                value={address.state}
                readOnly
                className="w-full bg-[#1a0c20] border border-gray-700 rounded px-3 py-2 text-white"
              />
            </div>
          </div>

          {address.street && address.number && (
            <button
              onClick={calculateDistance}
              disabled={isLoading}
              className="w-full bg-[#5C005C] hover:bg-[#4a004a] text-white py-2 rounded-lg font-medium transition-colors"
            >
              {isLoading ? 'Calculando...' : 'Calcular Transporte'}
            </button>
          )}

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          {transport.cost > 0 && (
            <div className="space-y-4">
              <div className="bg-[#5C005C]/20 rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/90">Distância total (ida e volta):</span>
                  <span className="text-white font-medium">
                    {transport.distance.toFixed(1)} km
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/90">Custo por dia:</span>
                  <span className="text-white font-medium">
                    R$ {transport.cost.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Quantidade de dias:
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleDaysChange(false)}
                    className="bg-[#5C005C] hover:bg-[#4a004a] text-white p-2 rounded"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    value={transport.days}
                    onChange={handleDaysInput}
                    min={1}
                    className="bg-transparent text-white text-center w-16 focus:outline-none focus:ring-1 focus:ring-[#5C005C] rounded"
                  />
                  <button
                    onClick={() => handleDaysChange(true)}
                    className="bg-[#5C005C] hover:bg-[#4a004a] text-white p-2 rounded"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {transport.distance > 60 && (
                <p className="text-yellow-400 text-sm">
                  Valores adicionais de hospedagem e logística serão negociados à parte.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};