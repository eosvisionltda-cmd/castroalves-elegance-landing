import serviceConstruction from '@/assets/service-construction.jpg';
import serviceRenovation from '@/assets/service-renovation.jpg';
import serviceManagement from '@/assets/service-management.jpg';

const solutions = [
  {
    title: 'Construção',
    description: 'Edificações residenciais e comerciais de alto padrão',
    image: serviceConstruction,
  },
  {
    title: 'Obras e Reformas',
    description: 'Transformação de espaços com excelência e sofisticação',
    image: serviceRenovation,
  },
  {
    title: 'Gerenciamento de Obras',
    description: 'Gestão completa do seu projeto do início ao fim',
    image: serviceManagement,
  },
];

const Solutions = () => {
  return (
    <section id="servicos" className="py-24 md:py-32 bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-title">Nossas Soluções</span>
          <h2 className="section-heading mt-3 mb-4">
            Expertise em cada etapa
          </h2>
          <p className="section-subtitle mx-auto">
            Do planejamento à execução, cuidamos de cada etapa da sua obra.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {solutions.map((solution, index) => (
            <div
              key={solution.title}
              className="card-service h-[400px] md:h-[500px] rounded-sm overflow-hidden"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Background Image */}
              <img
                src={solution.image}
                alt={solution.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-2 transition-transform duration-300 group-hover:-translate-y-2">
                  {solution.title}
                </h3>
                <p className="text-foreground/70 font-sans text-sm max-w-xs opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  {solution.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
