import React from 'react';
import { 
  Palette, Globe, FileText, Mail, Bot, 
  Instagram, BarChart, Video, Briefcase,
  LogIn, CreditCard, ShoppingBag, Calendar, GraduationCap,
  Ticket, UtensilsCrossed, Building2, Dumbbell, Music,
  Smartphone, Search, BookOpen
} from 'lucide-react';
import { ServiceCategory } from '../types';

export const servicesData: ServiceCategory[] = [
  {
    id: 'diagnostic',
    name: 'Diagnóstico',
    description: 'Descubra exatamente onde o seu negócio pode melhorar para crescer com mais eficiência',
    icon: <Search size={20} />,
    services: [
      {
        id: 'marketing-diagnostic',
        name: 'Diagnóstico de Marketing',
        description: 'Análise completa da presença digital do seu negócio: identidade visual, site, redes sociais, Google, SEO, anúncios e muito mais. Você recebe um relatório estratégico em PDF com avaliação dos pontos fortes e pontos de melhoria, entregue em até 2 dias após a contratação',
        prices: {
          oneTime: 97
        }
      },
      {
        id: 'diagnostic-consulting',
        name: 'Consultoria de Diagnóstico',
        description: 'Análise orientada com insights estratégicos sobre presença digital, ideal para quem deseja aplicar as melhorias por conta própria. Inclui 1 reunião online de até 60 minutos com orientação prática sobre os pontos identificados no diagnóstico',
        prices: {
          oneTime: 290
        }
      }
    ]
  },
  {
    id: 'design',
    name: 'Design & Marca',
    description: 'Primeira impressão do seu negócio',
    icon: <Palette size={20} />,
    services: [
      {
        id: 'visual-identity',
        name: 'Identidade Visual',
        description: 'Criação completa da identidade visual da sua marca, incluindo logotipo, paleta de cores e tipografia',
        prices: {
          oneTime: 490
        }
      },
      {
        id: 'brandbook',
        name: 'BrandBook',
        description: 'Manual completo de identidade visual para uso prático da marca',
        prices: {
          oneTime: 1490
        }
      },
      {
        id: 'social-templates',
        name: 'Templates Editáveis',
        description: 'Artes estáticas e animadas editáveis, prontos para uso nas redes sociais, ideal para quem não pode contratar gerenciamento de redes sociais. Observação: Na escolha de qualquer template, ganha edição da foto de perfil e criação da capa para o WhatsApp Business.',
        prices: {
          oneTime: 0 // Price will be calculated based on selected options
        },
        options: [
          {
            id: 'templateTypes',
            label: 'Tipos de Template',
            type: 'multiselect',
            choices: [
              { value: 'instagram', label: 'Instagram e Facebook (36 artes) - R$ 2.490' },
              { value: 'youtube', label: 'Youtube (15 artes) - R$ 1.340' },
              { value: 'linkedin', label: 'LinkedIn (11 artes) - R$ 940' }
            ]
          }
        ]
      },
      {
        id: 'visual-identity-consulting',
        name: 'Consultoria de Identidade Visual',
        description: 'Orientação criativa para construção ou refinamento da identidade visual do negócio. Ideal para quem quer desenvolver por conta própria com segurança estética e técnica. Inclui feedback de referência, paleta e tipografia',
        prices: {
          oneTime: 1900
        }
      }
    ]
  },
  {
    id: 'content-seo',
    name: 'Conteúdo e SEO',
    description: 'Atrair o cliente certo sem depender de anúncios',
    icon: <FileText size={20} />,
    services: [
      {
        id: 'blog-seo',
        name: 'Blog SEO',
        description: 'Artigos otimizados para buscas do Google e IA como o ChatGPT. Inclui pesquisa de palavras-chave, pauta, redação com SEO técnico e estratégia de conversão',
        prices: {
          monthly: 79.90
        },
        options: [
          {
            id: 'articleQuantity',
            label: 'Quantidade de Artigos Mensais',
            type: 'slider',
            default: 1,
            min: 1,
            max: 30
          }
        ]
      },
      {
        id: 'google-business',
        name: 'Google Meu Negócio',
        description: 'Gestão e otimização completa do perfil, com postagens, respostas e estratégias de visibilidade local',
        prices: {
          entry: 490,
          monthly: 149
        }
      },
      {
        id: 'content-seo-consulting',
        name: 'Consultoria de Conteúdo e SEO',
        description: 'Orientações sobre criação de artigos otimizados, definição de pauta, palavras-chave e estrutura técnica. Ideal para quem vai escrever por conta própria ou terceirizar com freelancers',
        prices: {
          oneTime: 990
        }
      }
    ]
  },
  {
    id: 'digital-presence',
    name: 'Presença Digital',
    description: 'Sua vitrine online 24h por dia',
    icon: <Globe size={20} />,
    services: [
      {
        id: 'institutional-site',
        name: 'Site Institucional',
        description: 'Site moderno e funcional, incluindo hospedagem, certificado SSL, termos de uso, política de privacidade e monitoramento',
        prices: {
          entry: 2500,
          monthly: 199
        }
      },
      {
        id: 'futuristic-site',
        name: 'Site Futurístico',
        description: 'Site com visual imersivo e efeitos especiais',
        prices: {
          entry: 4990,
          monthly: 249.90
        }
      },
      {
        id: 'digital-presence-consulting',
        name: 'Consultoria de Presença Digital',
        description: 'Planejamento estratégico para criação ou aprimoramento do site, escolha de recursos e plataformas ideais. Indicado para quem vai desenvolver o próprio site ou contratar terceiros',
        prices: {
          oneTime: 1900
        }
      }
    ]
  },
  {
    id: 'additional-modules',
    name: 'Módulos Adicionais',
    description: 'Recursos extras para transformar seu site em uma plataforma completa',
    icon: <LogIn size={20} />,
    services: [
      {
        id: 'login-area',
        name: 'Módulo Área de Login',
        description: 'Captação de contatos, login via email, Gmail e Facebook, área de membros, opção salvar cartão de crédito ao realizar compras no site',
        prices: {
          oneTime: 490
        }
      },
      {
        id: 'checkout',
        name: 'Módulo Checkout',
        description: 'Aceite pagamentos nacionais e internacionais, planos recorrentes, sinal de serviços e links de pagamento',
        prices: {
          oneTime: 490
        }
      },
      {
        id: 'ecommerce',
        name: 'Módulo E-commerce',
        description: 'Até 50 produtos hospedados e gerenciados, incluso edição básica de fotos e recuperação de carrinho',
        prices: {
          entry: 990,
          monthly: 199.90
        }
      },
      {
        id: 'scheduling',
        name: 'Módulo Agendamento',
        description: 'Gestão de salas e agendamentos integrados ao sistema de gestão, Google Agenda, Calendly',
        prices: {
          entry: 990,
          monthly: 49.90
        }
      },
      {
        id: 'online-course',
        name: 'Módulo Curso Online',
        description: 'Alunos ilimitados, certificado de conclusão, quiz e questionários, grupos',
        prices: {
          entry: 1490,
          monthly: 49.90
        }
      },
      {
        id: 'events',
        name: 'Módulo Eventos',
        description: 'Venda de eventos e ingressos ilimitados, gestão de tickets digitais via aplicativo mobile',
        prices: {
          entry: 490,
          monthly: 49.90
        }
      },
      {
        id: 'restaurant',
        name: 'Módulo Restaurante',
        description: 'Aceite pedidos e pagamentos online, entrega ou retirada, reservas e menu online profissional',
        prices: {
          entry: 990,
          monthly: 49.90
        }
      },
      {
        id: 'hotel-small',
        name: 'Módulo Hotel até 20 quartos',
        description: 'Integração com iCal, Booking.com, Airbnb, serviços extras, cupons, reservas e comodidades',
        prices: {
          entry: 2900,
          monthly: 290
        }
      },
      {
        id: 'hotel-large',
        name: 'Módulo Hotel mais de 20 quartos',
        description: 'Integração com iCal, Booking.com, Airbnb, serviços extras, cupons, reservas e comodidades',
        prices: {
          entry: 7900,
          monthly: 490
        }
      },
      {
        id: 'gym',
        name: 'Módulo Academia',
        description: 'Agendamento de sessões, planos e pacotes, lembretes de agendamentos e loja online',
        prices: {
          entry: 990,
          monthly: 90
        }
      },
      {
        id: 'music',
        name: 'Módulo Música',
        description: 'Reproduza e venda seu conteúdo de mídia, incluindo vídeo e música',
        prices: {
          entry: 990,
          monthly: 49.90
        }
      }
    ]
  },
  {
    id: 'mobile-app',
    name: 'Aplicativo',
    description: 'App nativo e moderno para Android e iOS',
    icon: <Smartphone size={20} />,
    services: [
      {
        id: 'app-basic',
        name: 'Aplicativo 50 GB',
        description: 'App nativo para iOS e Android, integrado ao site, notificações push ilimitadas',
        prices: {
          entry: 5000,
          monthly: 290
        }
      },
      {
        id: 'app-checkout',
        name: 'Aplicativo com checkout e 100 GB',
        description: 'App nativo com vendas de produtos, serviços, eventos, ingressos, agendamentos, reservas e pedidos',
        prices: {
          entry: 7000,
          monthly: 490
        }
      },
      {
        id: 'app-unlimited',
        name: 'Aplicativo com checkout ilimitado',
        description: 'App nativo com todas as funcionalidades e armazenamento ilimitado',
        prices: {
          entry: 7000,
          monthly: 990
        }
      }
    ]
  },
  {
    id: 'email-marketing',
    name: 'E-mail Marketing',
    description: 'Conecte-se diretamente com seu público',
    icon: <Mail size={20} />,
    services: [
      {
        id: 'professional-emails',
        name: 'E-mails Profissionais',
        description: 'Criação, configuração e gestão de e-mails personalizados com assinatura',
        prices: {
          monthly: 15
        },
        options: [
          {
            id: 'emailCapacity',
            label: 'Capacidade',
            type: 'select',
            choices: [
              { value: '5gb', label: '5GB - R$ 15/mês' },
              { value: '50gb', label: '50GB - R$ 20/mês' }
            ]
          },
          {
            id: 'emailQuantity',
            label: 'Quantidade de E-mails',
            type: 'number',
            default: 1,
            min: 1,
            max: 100
          }
        ]
      },
      {
        id: 'email-campaigns',
        name: 'Campanhas Profissionais',
        description: 'Criação e automação de e-mails para engajar e converter leads, com estruturação e relatórios',
        prices: {
          entry: 390,
          monthly: 590
        },
        options: [
          {
            id: 'contactLimit',
            label: 'Limite de Contatos',
            type: 'select',
            choices: [
              { value: '500', label: 'Até 500 contatos - R$ 590/mês' },
              { value: '5000', label: 'Até 5.000 contatos - R$ 790/mês' },
              { value: '1m', label: 'Até 1M de contatos - R$ 990/mês' }
            ]
          }
        ]
      },
      {
        id: 'email-marketing-consulting',
        name: 'Consultoria de E-mail Marketing',
        description: 'Estratégia de funil, segmentação e automação para quem deseja criar e gerenciar suas campanhas internamente. Inclui exemplos de fluxos e templates estratégicos',
        prices: {
          oneTime: 290
        }
      }
    ]
  },
  {
    id: 'social-media',
    name: 'Redes Sociais',
    description: 'Conexão direta com o público',
    icon: <Instagram size={20} />,
    services: [
      {
        id: 'instagram-facebook',
        name: 'Instagram e Facebook',
        description: '3 posts editados semanais, stories diários com estratégia visual e textual personalizada',
        prices: {
          entry: 990,
          monthly: 1290
        }
      },
      {
        id: 'youtube',
        name: 'YouTube',
        description: '4 vídeos de até 10 min. mensais editados e postados, stories diários com planejamento de pauta e SEO',
        prices: {
          entry: 990,
          monthly: 2290
        }
      },
      {
        id: 'tiktok',
        name: 'TikTok',
        description: '3 vídeos semanais editados, stories diários com linguagem atual e viral',
        prices: {
          entry: 990,
          monthly: 1290
        }
      },
      {
        id: 'linkedin',
        name: 'LinkedIn',
        description: '3 posts editados semanais, stories diários com foco em autoridade e posicionamento profissional',
        prices: {
          entry: 990,
          monthly: 1290
        }
      },
      {
        id: 'social-media-consulting',
        name: 'Consultoria de Redes Sociais',
        description: 'Planejamento de conteúdo, definição de tom, temas, formatos e calendário. Ideal para quem quer produzir os próprios posts com mais estratégia e consistência',
        prices: {
          oneTime: 1900
        }
      }
    ]
  },
  {
    id: 'paid-traffic',
    name: 'Tráfego Pago',
    description: 'Acelerador de resultados',
    icon: <BarChart size={20} />,
    services: [
      {
        id: 'google-ads',
        name: 'Google Ads',
        description: 'Campanhas de busca e conversão, com gestão estratégica e otimização constante',
        prices: {
          entry: 500,
          monthly: 490
        },
        options: [
          {
            id: 'monthlyBudget',
            label: 'Orçamento Mensal (R$)',
            type: 'number',
            default: 1000,
            min: 500
          }
        ]
      },
      {
        id: 'meta-ads',
        name: 'Meta Ads Facebook e Instagram',
        description: 'Campanhas para alcance, remarketing e conversão de leads',
        prices: {
          entry: 500,
          monthly: 490
        },
        options: [
          {
            id: 'monthlyBudget',
            label: 'Orçamento Mensal (R$)',
            type: 'number',
            default: 1000,
            min: 500
          }
        ]
      },
      {
        id: 'tiktok-ads',
        name: 'TikTok Ads',
        description: 'Campanhas para viralização e conversão de públicos jovens e engajados',
        prices: {
          entry: 500,
          monthly: 490
        },
        options: [
          {
            id: 'monthlyBudget',
            label: 'Orçamento Mensal (R$)',
            type: 'number',
            default: 1000,
            min: 500
          }
        ]
      },
      {
        id: 'linkedin-ads',
        name: 'LinkedIn Ads',
        description: 'Campanhas para engajamento e autoridade no mercado B2B',
        prices: {
          entry: 990,
          monthly: 990
        },
        options: [
          {
            id: 'monthlyBudget',
            label: 'Orçamento Mensal (R$)',
            type: 'number',
            default: 1000,
            min: 500
          }
        ]
      },
      {
        id: 'paid-traffic-consulting',
        name: 'Consultoria de Tráfego Pago',
        description: 'Estruturação de campanhas no Google, Meta, TikTok ou LinkedIn Ads com definição de público, verba e criativos recomendados. Ideal para quem quer rodar anúncios por conta própria',
        prices: {
          oneTime: 1900
        }
      }
    ]
  },
  {
    id: 'production',
    name: 'Produção',
    description: 'Essencial para gerar autoridade e audiência',
    icon: <Video size={20} />,
    services: [
      {
        id: 'professional-videos',
        name: 'Vídeos Profissionais',
        description: 'Diária de até 8 horas com roteiro, gravação e captação profissional',
        prices: {
          oneTime: 1490
        },
        options: [
          {
            id: 'dayQuantity',
            label: 'Quantidade de Diárias',
            type: 'number',
            default: 1,
            min: 1
          }
        ]
      },
      {
        id: 'professional-photos',
        name: 'Fotos Profissionais',
        description: 'Captura em até 3 horas com roteiro. Ideal para campanhas, produtos, equipe e identidade pessoal',
        prices: {
          oneTime: 49
        },
        options: [
          {
            id: 'photoQuantity',
            label: 'Quantidade de Fotos',
            type: 'number',
            default: 10,
            min: 10
          }
        ]
      },
      {
        id: 'drone-recording',
        name: 'Gravação com Drone',
        description: 'Filmagens aéreas com qualidade cinematográfica. Inclui roteiro e captação de até 2 horas',
        prices: {
          oneTime: 690
        },
        options: [
          {
            id: 'dayQuantity',
            label: 'Quantidade de Diárias',
            type: 'number',
            default: 1,
            min: 1
          }
        ]
      },
      {
        id: 'production-consulting',
        name: 'Consultoria de Produção Audiovisual',
        description: 'Orientações sobre roteiro, captação com celular ou câmeras simples, iluminação e cenário para produzir conteúdo com recursos próprios',
        prices: {
          oneTime: 1900
        }
      }
    ]
  },
  {
    id: 'automations',
    name: 'Automações',
    description: 'Eficiência e escalabilidade',
    icon: <Bot size={20} />,
    services: [
      {
        id: 'whatsapp-bot',
        name: 'WhatsApp com Robô',
        description: 'Atendimento automatizado com respostas programadas e menus interativos',
        prices: {
          entry: 990,
          monthly: 490
        }
      },
      {
        id: 'whatsapp-ai-standard',
        name: 'WhatsApp com IA padrão',
        description: 'Respostas inteligentes como um humano sem integrações com sistemas, responde texto, áudio e imagem',
        prices: {
          entry: 1990,
          monthly: 490
        }
      },
      {
        id: 'whatsapp-ai-text',
        name: 'WhatsApp com IA - Texto',
        description: 'Respostas inteligentes como um humano, integração API com sistemas e ERPs para envio de orçamentos e agendamentos',
        prices: {
          entry: 4900,
          monthly: 690
        }
      },
      {
        id: 'whatsapp-ai-audio',
        name: 'WhatsApp com IA - Áudio',
        description: 'Interpretação e resposta automática de áudios recebidos e integração API com sistemas e ERPs',
        prices: {
          entry: 4900,
          monthly: 690
        }
      },
      {
        id: 'whatsapp-ai-image',
        name: 'WhatsApp com IA - Imagem',
        description: 'Leitura e resposta automática de imagens recebidas e integração API com sistemas e ERPs',
        prices: {
          entry: 4900,
          monthly: 690
        }
      },
      {
        id: 'automation-consulting',
        name: 'Consultoria de Automações',
        description: 'Planejamento de automações via WhatsApp, e-mail ou sistemas CRM, com indicação de ferramentas, fluxos e mensagens estratégicas. Ideal para quem deseja configurar tudo por conta',
        prices: {
          oneTime: 1900
        }
      }
    ]
  },
  {
    id: 'sales',
    name: 'Vendas & Pós-Vendas',
    description: 'Sustentação e crescimento do negócio',
    icon: <Briefcase size={20} />,
    services: [
      {
        id: 'online-sales-training',
        name: 'Treinamento Comercial Online',
        description: 'Capacitação prática para equipes de venda',
        prices: {
          oneTime: 1490
        }
      },
      {
        id: 'presential-sales-training',
        name: 'Treinamento Comercial Presencial',
        description: 'Capacitação prática para equipes de venda',
        prices: {
          oneTime: 1970
        }
      },
      {
        id: 'after-sales-strategy',
        name: 'Estratégia Pós-Venda',
        description: 'Criação de processos para fidelizar clientes e gerar novas vendas',
        prices: {
          oneTime: 1470
        }
      },
      {
        id: 'sales-consulting',
        name: 'Consultoria de Vendas',
        description: 'Plano de ação multicanal para escalar resultados comerciais',
        prices: {
          oneTime: 5000
        }
      },
      {
        id: 'sales-after-sales-consulting',
        name: 'Consultoria Comercial e Pós-Venda',
        description: 'Mapeamento do funil de vendas e estruturação de processos de atendimento, fechamento e fidelização para ser executado internamente',
        prices: {
          oneTime: 7000
        }
      }
    ]
  },
  {
    id: 'infoproducts',
    name: 'Infoprodutos',
    description: 'Para produtos digitais como e-books, cursos, eventos e palestras',
    icon: <BookOpen size={20} />,
    services: [
      {
        id: 'planning-positioning',
        name: 'Planejamento E Posicionamento',
        description: 'Pesquisa de Persona e Público-Alvo, Análise de Concorrência, Planejamento Estratégico de Produto e Oferta, Definição de Funil de Vendas, Posicionamento de Marca Pessoal ou Produto, Roteiro de Lançamento Interno, Semente e etc',
        prices: {
          oneTime: 3000
        }
      },
      {
        id: 'members-area-design',
        name: 'Design Área de Membros',
        description: 'Identidade completa desktop e mobile com 12 criativos profissionais estilo Netflix para a área de membros Kiwify, Hotmart, Ticto, Eduzz, Green, Kirvano, entre outras',
        prices: {
          entry: 1200
        },
        options: [
          {
            id: 'coverQuantity',
            label: 'Quantidade de Capas de Aula',
            type: 'number',
            default: 0,
            min: 0
          }
        ]
      },
      {
        id: 'ebook',
        name: 'E-book',
        description: 'Criação dos textos e visual',
        prices: {
          oneTime: 49
        },
        options: [
          {
            id: 'pageQuantity',
            label: 'Quantidade de Páginas',
            type: 'number',
            default: 5,
            min: 5
          }
        ]
      },
      {
        id: 'landing-page',
        name: 'Landing Page de Vendas',
        description: 'Página completa com até 5 sessões para conversão de leads, Integração com Plataformas de Infoprodutos Hotmart, Eduzz, Kiwify e etc',
        prices: {
          entry: 749.90,
          monthly: 49.90
        }
      },
      {
        id: 'additional-pages-pack',
        name: 'Pacote com Página de Obrigado, Espera, Pré-lançamento, Checkout',
        description: 'Estrutura completa',
        prices: {
          oneTime: 490.90
        }
      },
      {
        id: 'additional-pages',
        name: 'Páginas Adicionais',
        description: 'Formulários, páginas de agradecimento, lista de espera etc',
        prices: {
          oneTime: 99.90
        }
      },
      {
        id: 'strategic-texts',
        name: 'Textos Estratégicos',
        description: 'Copywriting otimizado para landing page de conversão',
        prices: {
          oneTime: 290
        }
      },
      {
        id: 'video-hosting',
        name: 'Hospedagem de Vídeos',
        description: 'Para incluir na área de membros ou na landing page com cores e botões editáveis e personalizáveis',
        prices: {
          monthly: 49
        },
        options: [
          {
            id: 'storage',
            label: 'Armazenamento',
            type: 'select',
            choices: [
              { value: '100gb', label: 'Até 100GB - R$ 49/mês' },
              { value: '200gb', label: 'Até 200GB - R$ 90/mês' },
              { value: '500gb', label: 'Até 500GB - R$ 190/mês' },
              { value: '1tb', label: 'Até 1TB - R$ 390/mês' }
            ]
          }
        ]
      },
      {
        id: 'community-management',
        name: 'Gestão de Comunidade',
        description: 'Grupos no Telegram, Close Friends, etc',
        prices: {
          monthly: 990
        },
        options: [
          {
            id: 'platformQuantity',
            label: 'Quantidade de Plataformas',
            type: 'number',
            default: 1,
            min: 1
          }
        ]
      },
      {
        id: 'infoproduct-consulting',
        name: 'Consultoria Estratégica para Infoprodutos',
        description: 'Planejamento completo para lançamentos, perpétuo, estruturação de funil, páginas e área de membros. Ideal para quem deseja autonomia e controle total',
        prices: {
          oneTime: 1900
        }
      }
    ]
  }
];

export const getCategoryById = (categoryId: string): ServiceCategory | undefined => {
  return servicesData.find(category => category.id === categoryId);
};

export const getServiceById = (categoryId: string, serviceId: string) => {
  const category = getCategoryById(categoryId);
  return category?.services.find(service => service.id === serviceId);
};