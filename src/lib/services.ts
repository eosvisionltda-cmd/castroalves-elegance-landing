export const servicePages = {
  '/construcao-alto-padrao': {
    label: 'Construção', title: 'Construção de casas de alto padrão em São Paulo',
    description: 'Execução da sua casa com atenção ao projeto, às etapas e aos acabamentos. Converse com a Castro Alves sobre a obra que você está planejando.',
    detail: 'Da preparação da obra aos acabamentos, uma execução alinhada ao seu projeto arquitetônico.',
    points: ['Alinhamento com o projeto arquitetônico', 'Coordenação das etapas de execução', 'Acompanhamento dos acabamentos'],
  },
  '/reformas-alto-padrao': {
    label: 'Reforma', title: 'Reformas de apartamentos e casas de alto padrão',
    description: 'Transforme seu imóvel com execução cuidadosa e acompanhamento da obra. Conheça nossas entregas e solicite uma avaliação do seu projeto.',
    detail: 'Transformação de apartamentos e residências, com cuidado na execução e nos detalhes do projeto.',
    points: ['Execução alinhada ao projeto de reforma', 'Acompanhamento de cada etapa', 'Atenção aos materiais e acabamentos'],
  },
  '/gerenciamento-de-obras': {
    label: 'Gerenciamento de obras', title: 'Gerenciamento de obras com acompanhamento próximo',
    description: 'Tenha uma equipe acompanhando as etapas da obra e o alinhamento com fornecedores e parceiros. Conte à Castro Alves sobre o seu projeto.',
    detail: 'Coordenação da execução e alinhamento entre projeto, fornecedores e etapas da sua obra.',
    points: ['Acompanhamento da execução', 'Alinhamento com fornecedores e parceiros', 'Conferência das escolhas em relação ao projeto'],
  },
} as const;
export function getServicePage(pathname: string) {
  return servicePages[pathname.replace(/\/$/, '') as keyof typeof servicePages];
}
