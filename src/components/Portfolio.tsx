import { useState } from 'react';
import { X } from 'lucide-react';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import portfolio4 from '@/assets/portfolio-4.jpg';
import portfolio5 from '@/assets/portfolio-5.jpg';
import portfolio6 from '@/assets/portfolio-6.jpg';

const portfolioItems = [
  {
    image: portfolio1,
    title: 'Reforma Residencial – São Paulo/SP',
    type: 'Reforma completa',
    area: '120m²',
    description: 'Transformação completa de apartamento com acabamento premium.',
  },
  {
    image: portfolio2,
    title: 'Cozinha Gourmet – São Paulo/SP',
    type: 'Reforma parcial',
    area: '35m²',
    description: 'Projeto moderno com ilha central e marcenaria sob medida.',
  },
  {
    image: portfolio3,
    title: 'Banheiro Master – Guarulhos/SP',
    type: 'Reforma completa',
    area: '18m²',
    description: 'Banheiro de luxo com revestimentos importados.',
  },
  {
    image: portfolio4,
    title: 'Suíte Principal – São Paulo/SP',
    type: 'Reforma completa',
    area: '45m²',
    description: 'Suíte com closet integrado e iluminação planejada.',
  },
  {
    image: portfolio5,
    title: 'Escritório Corporativo – São Paulo/SP',
    type: 'Reforma comercial',
    area: '200m²',
    description: 'Espaço corporativo moderno e funcional.',
  },
  {
    image: portfolio6,
    title: 'Varanda Gourmet – São Paulo/SP',
    type: 'Reforma parcial',
    area: '28m²',
    description: 'Área gourmet com churrasqueira e bancada em granito.',
  },
];

const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <section id="portfolio" className="py-24 md:py-32 bg-background">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-16">
          <span className="section-title">Nosso Portfólio</span>
            <h2 className="section-heading mt-3 mb-4">
              Obras residenciais e corporativas premium
            </h2>
            <p className="section-subtitle mx-auto">
              Confira alguns de nossos projetos realizados.
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className="portfolio-item rounded-sm overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(item.image)}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.title} - Obra de alto padrão Castro Alves`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-primary font-sans text-sm uppercase tracking-wider">Ver Projeto</span>
                  </div>
                </div>
                {/* Info */}
                <div className="bg-card p-5">
                  <h3 className="font-serif text-lg text-foreground mb-1">{item.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-sans mb-2">
                    <span>{item.type}</span>
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    <span>{item.area}</span>
                  </div>
                  <p className="text-sm text-muted-foreground font-sans">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Fechar"
          >
            <X size={32} />
          </button>
          <img
            src={selectedImage}
            alt="Projeto"
            className="max-w-full max-h-[90vh] object-contain animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default Portfolio;
