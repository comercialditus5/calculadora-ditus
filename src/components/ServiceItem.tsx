import React, { useState } from 'react';
import { Service, SelectedService } from '../types';
import { Plus, Minus } from 'lucide-react';

interface ServiceItemProps {
  service: Service;
  category: string;
  isSelected: boolean;
  selectedOptions: Record<string, any>;
  toggleService: (service: SelectedService) => void;
  updateOptions: (options: Record<string, any>) => void;
}

export const ServiceItem: React.FC<ServiceItemProps> = ({
  service,
  category,
  isSelected,
  selectedOptions,
  toggleService,
  updateOptions
}) => {
  const handleToggle = () => {
    const initialOptions: Record<string, any> = {};
    
    // Set default values for options
    service.options?.forEach(option => {
      if (option.type === 'multiselect') {
        initialOptions[option.id] = [];
      } else if (option.type === 'number' || option.type === 'slider') {
        initialOptions[option.id] = option.default || option.min || 0;
      } else {
        initialOptions[option.id] = option.default || '';
      }
    });

    toggleService({
      id: service.id,
      name: service.name,
      category,
      options: isSelected ? {} : initialOptions,
      prices: {
        entry: service.prices.entry || 0,
        monthly: service.prices.monthly || 0,
        oneTime: service.prices.oneTime || 0
      }
    });
  };

  const handleOptionChange = (optionId: string, value: any) => {
    updateOptions({
      ...selectedOptions,
      [optionId]: value
    });
  };

  const handleInputChange = (option: any, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    handleOptionChange(option.id, value);
  };

  const renderQuantityControl = (option: any) => {
    const value = selectedOptions[option.id] || option.default || 0;
    const isValidValue = value >= (option.min || 0);
    
    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => handleOptionChange(option.id, Math.max(0, value - 1))}
            className="bg-[#5C005C]/20 hover:bg-[#5C005C]/30 text-white p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus size={16} />
          </button>
          <input
            type="number"
            value={value}
            onChange={(e) => handleInputChange(option, e)}
            className="bg-transparent text-white text-center w-16 focus:outline-none focus:ring-1 focus:ring-[#5C005C] rounded"
            min={0}
            max={option.max}
          />
          <button
            type="button"
            onClick={() => handleOptionChange(option.id, value + 1)}
            className="bg-[#5C005C]/20 hover:bg-[#5C005C]/30 text-white p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={option.max !== undefined && value >= option.max}
          >
            <Plus size={16} />
          </button>
        </div>
        
        {!isValidValue && (
          <p className="text-red-400 text-sm">
            Quantidade mínima: {option.min}. Este serviço só será incluído se atingir a quantidade mínima.
          </p>
        )}
      </div>
    );
  };

  return (
    <div className={`p-4 rounded-lg transition duration-200 ${
      isSelected 
        ? 'bg-[#5C005C]/30 border border-[#5C005C]/50' 
        : 'bg-[#1a0c20]/40 border border-gray-800/40 hover:border-gray-700/40'
    }`}>
      <div className="flex items-start">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleToggle}
              className="mr-3 h-5 w-5 rounded border-gray-700 text-[#5C005C] focus:ring-[#5C005C]"
            />
            <h4 className="font-medium text-white">{service.name}</h4>
          </div>
          
          <div className="ml-8 text-sm text-white/70 mb-3">
            {service.description}
          </div>

          <div className="ml-8 space-y-3">
            {isSelected && service.options?.map((option) => (
              <div key={option.id} className="text-sm">
                <label className="block text-white/90 mb-1">{option.label}</label>
                
                {option.type === 'select' && (
                  <select
                    className="w-full bg-[#1a0c20] border border-gray-700 rounded px-3 py-2 text-white/90"
                    value={selectedOptions[option.id] || option.default || ''}
                    onChange={(e) => handleOptionChange(option.id, e.target.value)}
                  >
                    {option.choices?.map((choice) => (
                      <option key={choice.value} value={choice.value}>
                        {choice.label}
                      </option>
                    ))}
                  </select>
                )}
                
                {option.type === 'multiselect' && (
                  <div className="space-y-2">
                    {option.choices?.map((choice) => (
                      <label key={choice.value} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={(selectedOptions[option.id] || []).includes(choice.value)}
                          onChange={(e) => {
                            const currentValues = selectedOptions[option.id] || [];
                            const newValues = e.target.checked
                              ? [...currentValues, choice.value]
                              : currentValues.filter((v: string) => v !== choice.value);
                            handleOptionChange(option.id, newValues);
                          }}
                          className="rounded border-gray-700 text-[#5C005C] focus:ring-[#5C005C]"
                        />
                        <span className="text-white/90">{choice.label}</span>
                      </label>
                    ))}
                  </div>
                )}
                
                {(option.type === 'number' || option.type === 'slider') && renderQuantityControl(option)}
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-[150px] text-right">
          {service.prices.oneTime > 0 && (
            <div className="mb-1">
              <span className="text-purple-300 font-medium">
                R$ {service.prices.oneTime.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
              </span>
              <span className="text-white/60 text-xs"> único</span>
            </div>
          )}
          
          {service.prices.entry > 0 && (
            <div className="mb-1">
              <span className="text-purple-300 font-medium">
                R$ {service.prices.entry.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
              </span>
              <span className="text-white/60 text-xs"> entrada</span>
            </div>
          )}
          
          {service.prices.monthly > 0 && (
            <div>
              <span className="text-purple-300 font-medium">
                R$ {service.prices.monthly.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
              </span>
              <span className="text-white/60 text-xs">/mês</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};