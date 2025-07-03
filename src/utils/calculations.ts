import { SelectedService, PaymentMethod } from '../types';

export const calculateTotals = (selectedServices: SelectedService[]) => {
  const totals = selectedServices.reduce(
    (acc, service) => {
      let entry = service.prices.entry || 0;
      let oneTime = service.prices.oneTime || 0;
      let monthly = service.prices.monthly || 0;
      let paidTraffic = 0;

      // Handle special cases based on service ID
      switch (service.id) {
        case 'blog-seo':
          // Blog SEO - R$ 79.90 per article
          const articleQuantity = service.options.articleQuantity || 0;
          if (articleQuantity >= 1) {
            monthly = 79.90 * Math.min(30, articleQuantity);
          }
          break;

        case 'social-templates':
          // Templates Editáveis
          if (service.options.templateTypes) {
            oneTime = service.options.templateTypes.reduce((total: number, type: string) => {
              const prices = {
                'instagram': 2490,
                'youtube': 1340,
                'linkedin': 940
              };
              return total + (prices[type as keyof typeof prices] || 0);
            }, 0);
          }
          break;

        case 'email-campaigns':
          // Campanhas Profissionais
          const campaignPrices = {
            '500': 590,
            '5000': 790,
            '1m': 990
          };
          monthly = campaignPrices[service.options.contactLimit as keyof typeof campaignPrices] || 590;
          break;

        case 'professional-emails':
          // E-mails Profissionais
          const emailPrice = service.options.emailCapacity === '50gb' ? 20 : 15;
          const emailQuantity = service.options.emailQuantity || 0;
          if (emailQuantity >= 1) {
            monthly = emailPrice * emailQuantity;
          }
          break;

        case 'google-ads':
        case 'meta-ads':
        case 'tiktok-ads':
        case 'linkedin-ads':
          // Tráfego Pago
          const budget = Number(service.options.monthlyBudget) || 0;
          if (budget >= 500) {
            entry = 500;
            monthly = 490;
            paidTraffic = budget;
          }
          break;

        case 'professional-photos':
          // Fotos Profissionais
          const photoQuantity = service.options.photoQuantity || 0;
          if (photoQuantity >= 10) {
            oneTime = photoQuantity * 49;
          }
          break;

        case 'drone-recording':
          // Gravação com Drone
          const droneDays = service.options.dayQuantity || 0;
          if (droneDays >= 1) {
            oneTime = droneDays * 690;
          }
          break;

        case 'members-area-design':
          // Design Área de Membros
          const coverQuantity = service.options.coverQuantity || 0;
          entry = 1200 + (coverQuantity * 100);
          break;

        case 'ebook':
          // E-book
          const pageQuantity = service.options.pageQuantity || 0;
          if (pageQuantity >= 5) {
            oneTime = pageQuantity * 49;
          }
          break;

        case 'video-hosting':
          // Hospedagem de Vídeos
          const storagePrices = {
            '100gb': 49,
            '200gb': 90,
            '500gb': 190,
            '1tb': 390
          };
          monthly = storagePrices[service.options.storage as keyof typeof storagePrices] || 49;
          break;

        case 'community-management':
          // Gestão de Comunidade
          const platformQuantity = service.options.platformQuantity || 0;
          if (platformQuantity >= 1) {
            monthly = 990 * platformQuantity;
          }
          break;

        default:
          break;
      }

      return {
        entry: acc.entry + entry,
        oneTime: acc.oneTime + oneTime,
        monthly: acc.monthly + monthly,
        paidTraffic: acc.paidTraffic + paidTraffic
      };
    },
    { entry: 0, oneTime: 0, monthly: 0, paidTraffic: 0 }
  );

  // Calculate 5% fee for paid traffic
  const paidTrafficFee = totals.paidTraffic * 0.05;

  return {
    uniqueTotal: totals.entry + totals.oneTime, // Total of one-time payments and entry fees
    monthlyTotal: totals.monthly + paidTrafficFee, // Total monthly recurring payments including paid traffic fee
    paidTrafficTotal: totals.paidTraffic // Total paid traffic budget without fee
  };
};

export const getCreditFeePercentage = (installments: number): number => {
  const fees = {
    1: 4.20,  // à vista
    2: 6.09,
    3: 7.01,
    4: 7.91,
    5: 8.80,
    6: 9.67,
    7: 12.59,
    8: 13.42,
    9: 14.25,
    10: 15.06,
    11: 15.87,
    12: 16.66,
  };

  return fees[installments as keyof typeof fees] || 0;
};

export const calculateFees = (amount: number, paymentMethod: PaymentMethod): number => {
  if (paymentMethod.type === 'pix') {
    return amount;
  }

  const feePercentage = getCreditFeePercentage(paymentMethod.installments);
  return amount * (1 + feePercentage / 100);
};

export const calculateInstallmentValue = (amount: number, installments: number): number => {
  const totalWithFees = amount * (1 + getCreditFeePercentage(installments) / 100);
  const installmentValue = totalWithFees / installments;
  return Number(installmentValue.toFixed(2));
};

export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

export const calculateTransportCost = (distance: number): number => {
  return distance * 4; // R$ 4,00 per km
};