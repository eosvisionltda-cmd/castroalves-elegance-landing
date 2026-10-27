import { Link } from 'react-router-dom';
import BeforeAfter from '@/components/BeforeAfter';
import renovationBefore from '@/assets/simulation-renovation-before.png';
import renovationAfter from '@/assets/og-obra-1.webp';
import constructionBefore from '@/assets/simulation-construction-before.png';
import constructionAfter from '@/assets/simulation-construction-after.png';
import { servicePages, getServicePage } from '@/lib/services';
import { serviceSolutions } from '@/lib/service-solutions';
import serviceConstruction from '@/assets/service-construction.jpg';
import serviceRenovation from '@/assets/service-renovation.jpg';
import serviceManagement from '@/assets/service-management.jpg';
const images = [serviceConstruction, serviceRenovation, serviceManagement];
const Solutions = ({ service }: { service?: ReturnType<typeof getServicePage> }) => {
  if (service) {
    const solution = serviceSolutions[service.label];
    const image = service.label === 'Construção' ? serviceConstruction : service.label === 'Reforma' ? serviceRenovation : serviceManagement;
    return (
      <section id="servicos" className="py-20 md:py-28 bg-background scroll-mt-24" aria-labelledby="solution-title">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="section-title">Solução</span>
            <h2 id="solution-title" className="section-heading mt-3 mb-5">{solution.title}</h2>
            <p className="section-subtitle mx-auto !text-base leading-relaxed">{solution.intro}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
            {service.label === 'Reforma' ? (
              <BeforeAfter key="renovation" before={renovationBefore} after={renovationAfter}
                beforeAlt="Simulação com IA da cozinha antes dos acabamentos" afterAlt="Foto da cozinha finalizada do portfólio Castro Alves"
                note="O antes é uma simulação criada com IA a partir da foto final do portfólio. Esta comparação não é um registro real de antes e depois da obra." />
            ) : service.label === 'Construção' ? (
              <BeforeAfter key="construction" before={constructionBefore} after={constructionAfter}
                beforeAlt="Simulação ilustrativa de uma casa na etapa de estrutura" afterAlt="Simulação ilustrativa da mesma casa finalizada"
                note="Imagens ilustrativas geradas com IA para demonstrar a evolução de uma construção. Não representam um registro de obra executada pela Castro Alves." />
            ) : <img src={image} alt={service.label + ' de alto padrão'} className="w-full h-64 md:h-80 object-cover rounded-sm" loading="lazy" />}
            <div className="border-l-2 border-primary/60 pl-6 py-3">
              <h3 className="font-serif text-3xl mb-4">Para quem é esta solução</h3>
              <p className="text-foreground/80 text-base leading-relaxed">{solution.audience}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-5">{solution.prompt}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5" aria-label={'Como funciona: ' + service.label}>
            {solution.steps.map((step, index) => <article key={step.title} className="service-step bg-card border border-border rounded-sm p-6 md:p-8">
              <span className="text-primary text-xs tracking-widest">0{index + 1}</span>
              <h3 className="font-serif text-2xl mt-3 mb-3">{step.title}</h3>
              <p className="text-foreground/75 text-sm leading-relaxed">{step.text}</p>
            </article>)}
          </div>
          <div className="text-center mt-10">
            <p className="text-muted-foreground text-xs leading-relaxed mb-6 max-w-xl mx-auto">O escopo, as etapas e as responsabilidades são definidos após a análise da sua obra.</p>
            <button className="btn-primary !text-xs" onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}>{solution.action}</button>
          </div>
        </div>
      </section>
    );
  }
  return (
  <section id="servicos" className="py-24 md:py-32 bg-background scroll-mt-24">
    <div className="container-custom">
      <div className="text-center mb-12">
        <span className="section-title">Nossas soluções</span>
        <h2 className="section-heading mt-3 mb-4">O serviço certo para a etapa da sua obra</h2>
        <p className="section-subtitle mx-auto">Construção, reforma e gerenciamento. Conheça cada frente e conte-nos o que você precisa.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(servicePages).map(([path, service], index) => (
          <Link key={path} to={path} className="group block bg-card border border-border rounded-sm overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
            <img src={images[index]} alt={service.label} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            <div className="p-6">
              <h3 className="font-serif text-2xl text-foreground mb-3">{service.label}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.detail}</p>
              <ul className="my-5 space-y-2 text-sm text-foreground/80">{service.points.map(point => <li key={point}>• {point}</li>)}</ul>
              <span className="text-primary text-sm">Conhecer o serviço →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);
};
export default Solutions;
