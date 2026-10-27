export const serviceSolutions = {
  'Construção': {
    title: 'Construção de alto padrão, do projeto aos acabamentos',
    intro: 'Sua casa começa com um projeto. A execução precisa transformar cada escolha em realidade, respeitando a proposta arquitetônica e o cuidado esperado para um imóvel de alto padrão.',
    audience: 'Para quem tem um terreno ou está planejando construir uma casa e procura uma empresa para conduzir a execução.',
    action: 'Conversar sobre minha construção',
    steps: [
      { title: 'Entendimento do projeto', text: 'Análise das necessidades da obra e do projeto disponível para definir o escopo de execução e os próximos passos.' },
      { title: 'Organização das etapas', text: 'Alinhamento da sequência de execução, das frentes de trabalho e das necessidades de materiais ao longo da construção.' },
      { title: 'Execução acompanhada', text: 'Acompanhamento das etapas e alinhamento com os profissionais envolvidos para manter a execução conectada ao projeto.' },
      { title: 'Atenção aos acabamentos', text: 'Cuidado nas interfaces entre materiais, instalações e acabamentos, que fazem diferença no resultado dos ambientes.' },
    ],
    prompt: 'Conte onde fica o terreno, a metragem aproximada e se você já tem projeto arquitetônico.',
  },
  'Reforma': {
    title: 'Uma reforma à altura do seu imóvel',
    intro: 'Reformar um apartamento ou uma casa exige mais do que trocar revestimentos. É preciso organizar a transformação do espaço e cuidar da execução para que o resultado converse com o projeto.',
    audience: 'Para proprietários que planejam uma transformação de alto padrão em apartamentos ou casas, com acompanhamento da execução.',
    action: 'Conversar sobre minha reforma',
    steps: [
      { title: 'Entendimento da transformação', text: 'Alinhamento dos ambientes que serão reformados, das necessidades do imóvel e do projeto que orienta as intervenções.' },
      { title: 'Organização da execução', text: 'Coordenação das etapas da reforma e das interfaces entre profissionais, materiais e serviços envolvidos.' },
      { title: 'Cuidado com o projeto', text: 'Conferência das escolhas de execução em relação à proposta arquitetônica, com atenção às instalações e aos detalhes dos ambientes.' },
      { title: 'Acabamentos bem acompanhados', text: 'Acompanhamento dos revestimentos, encontros de materiais e detalhes que ajudam a definir o padrão da entrega.' },
    ],
    prompt: 'Conte onde fica o imóvel, quais ambientes pretende reformar, a metragem e a previsão de início.',
  },
  'Gerenciamento de obras': {
    title: 'Gerenciamento para acompanhar sua obra de perto',
    intro: 'Uma obra reúne diferentes profissionais, fornecedores e decisões. O gerenciamento aproxima essas frentes e acompanha a execução para manter as escolhas alinhadas ao projeto.',
    audience: 'Para quem vai iniciar ou já tem uma obra em andamento e precisa de acompanhamento e coordenação da execução.',
    action: 'Conversar sobre o gerenciamento',
    steps: [
      { title: 'Leitura do cenário da obra', text: 'Entendimento do projeto, da etapa atual e dos profissionais envolvidos para definir as necessidades de acompanhamento.' },
      { title: 'Coordenação das frentes', text: 'Alinhamento da sequência de trabalho e das interfaces entre os serviços que precisam acontecer na obra.' },
      { title: 'Fornecedores e parceiros', text: 'Acompanhamento das demandas e alinhamento com fornecedores e profissionais para apoiar as decisões da execução.' },
      { title: 'Conferência em relação ao projeto', text: 'Acompanhamento em campo para verificar como as escolhas e os serviços se conectam ao resultado previsto para os ambientes.' },
    ],
    prompt: 'Conte onde fica a obra, em qual etapa está e que tipo de acompanhamento você precisa.',
  },
} as const;
