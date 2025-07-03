export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  prices: {
    entry?: number;
    monthly?: number;
    oneTime?: number;
  };
  options?: ServiceOption[];
}

export interface ServiceOption {
  id: string;
  label: string;
  type: 'select' | 'number' | 'text' | 'slider' | 'multiselect';
  default?: any;
  min?: number;
  max?: number;
  choices?: {
    value: string;
    label: string;
  }[];
}

export interface SelectedService {
  id: string;
  name: string;
  category: string;
  options: Record<string, any>;
  prices: {
    entry: number;
    monthly: number;
    oneTime: number;
  };
}

export interface PaymentMethod {
  type: 'pix' | 'credit';
  installments: number;
}

export interface RecurringPayment {
  method: 'pix' | 'boleto' | 'credit';
  dueDate: 5 | 10 | 15 | 20 | 25;
}

export interface ClientInfo {
  businessName: string;
  contactName: string;
  whatsapp: string;
}

export interface Address {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}

export interface TransportInfo {
  distance: number;
  cost: number;
  days: number;
  address?: Address;
}