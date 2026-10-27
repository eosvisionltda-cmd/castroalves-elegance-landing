import { Link } from 'react-router-dom';
import { servicePages } from '@/lib/services';
import serviceConstruction from '@/assets/service-construction.jpg';
import serviceRenovation from '@/assets/service-renovation.jpg';
import serviceManagement from '@/assets/service-management.jpg';
const images = [serviceConstruction, serviceRenovation, serviceManagement];
const Solutions = () => (
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
export default Solutions;
