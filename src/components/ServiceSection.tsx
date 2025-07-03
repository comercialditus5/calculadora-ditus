import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { ServiceCategory, Service, SelectedService } from '../types';
import { ServiceItem } from './ServiceItem';

interface ServiceSectionProps {
  category: ServiceCategory;
  selectedServices: SelectedService[];
  toggleService: (service: SelectedService) => void;
  updateServiceOptions: (serviceId: string, category: string, options: Record<string, any>) => void;
}

export const ServiceSection: React.FC<ServiceSectionProps> = ({
  category,
  selectedServices,
  toggleService,
  updateServiceOptions
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#2a1333] to-[#1a0c20] shadow-lg transition-all duration-300 ease-in-out">
      <div 
        className="p-4 flex justify-between items-center cursor-pointer bg-gradient-to-r from-[#5C005C]/80 to-transparent hover:from-[#5C005C]"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          {category.icon && (
            <span className="mr-3 text-white">{category.icon}</span>
          )}
          <h3 className="text-xl font-semibold text-white">{category.name}</h3>
        </div>
        <div className="flex items-center">
          {selectedServices.some(s => s.category === category.id) && (
            <span className="mr-2 flex items-center text-sm bg-green-600/20 text-green-400 px-2 py-0.5 rounded">
              <Check size={14} className="mr-1" /> Selecionado
            </span>
          )}
          {isExpanded ? (
            <ChevronUp className="text-white/80" size={20} />
          ) : (
            <ChevronDown className="text-white/80" size={20} />
          )}
        </div>
      </div>

      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[2000px]' : 'max-h-0'
        }`}
      >
        <div className="p-4 text-white/80 text-sm">{category.description}</div>
        
        <div className="p-4 pt-0 grid grid-cols-1 gap-4">
          {category.services.map((service) => (
            <ServiceItem
              key={service.id}
              service={service}
              category={category.id}
              isSelected={selectedServices.some(
                s => s.id === service.id && s.category === category.id
              )}
              selectedOptions={
                selectedServices.find(
                  s => s.id === service.id && s.category === category.id
                )?.options || {}
              }
              toggleService={toggleService}
              updateOptions={(options) => updateServiceOptions(service.id, category.id, options)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};