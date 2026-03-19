import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import ogObra1 from '@/assets/og-obra-1.webp';
import ogObra2 from '@/assets/og-obra-2.webp';
import ogObra3 from '@/assets/og-obra-3.webp';
import ogObra4 from '@/assets/og-obra-4.webp';
import ogObra5 from '@/assets/og-obra-5.webp';
import ogObra6 from '@/assets/og-obra-6.webp';
import kmObra1 from '@/assets/km-obra-1.webp';
import kmObra2 from '@/assets/km-obra-2.webp';
import kmObra3 from '@/assets/km-obra-3.webp';
import kmObra4 from '@/assets/km-obra-4.webp';
import kmObra5 from '@/assets/km-obra-5.webp';
import kmObra6 from '@/assets/km-obra-6.webp';
import epObra1 from '@/assets/ep-obra-1.webp';
import epObra2 from '@/assets/ep-obra-2.webp';
import epObra3 from '@/assets/ep-obra-3.webp';
import epObra4 from '@/assets/ep-obra-4.webp';
import epObra5 from '@/assets/ep-obra-5.webp';
import epObra6 from '@/assets/ep-obra-6.webp';

interface PortfolioItem {
  cover: string;
  images: string[];
  title: string;
  type: string;
  area: string;
  description: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    cover: ogObra3,
    images: [ogObra3, ogObra1, ogObra2, ogObra4, ogObra5, ogObra6],
    title: 'Obra O|G – Itaim Bibi/SP',
    type: 'Gerenciamento e execução',
    area: '200m²',
    description: 'Projeto residencial de alto padrão com acabamentos sofisticados, marcenaria sob medida e iluminação cênica em cada ambiente.',
  },
  {
    cover: kmObra6,
    images: [kmObra6, kmObra5, kmObra1, kmObra3, kmObra2, kmObra4],
    title: 'Obra K|M – Jardim Paulista/SP',
    type: 'Gerenciamento e execução',
    area: '350m²',
    description: 'Residência ampla com ambientes integrados, acabamentos clean e design contemporâneo no coração do Jardim Paulista.',
  },
  {
    cover: epObra5,
    images: [epObra5, epObra4, epObra6, epObra3, epObra2, epObra1],
    title: 'Obra E|P – Jardim Paulista/SP',
    type: 'Gerenciamento e execução',
    area: '250m²',
    description: 'Apartamento sofisticado com mármore calacata, mobiliário de design autoral e iluminação indireta em todos os ambientes.',
  },
  {
    cover: portfolio1,
    images: [portfolio1],
    title: 'Reforma Residencial – São Paulo/SP',
    type: 'Reforma completa',
    area: '120m²',
    description: 'Transformação completa de apartamento com acabamento premium.',
  },
  {
    cover: portfolio2,
    images: [portfolio2],
    title: 'Cozinha Gourmet – São Paulo/SP',
    type: 'Reforma parcial',
    area: '35m²',
    description: 'Projeto moderno com ilha central e marcenaria sob medida.',
  },
  {
    cover: portfolio3,
    images: [portfolio3],
    title: 'Banheiro Master – Guarulhos/SP',
    type: 'Reforma completa',
    area: '18m²',
    description: 'Banheiro de luxo com revestimentos importados.',
  },
];

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (item: PortfolioItem) => {
    setSelectedProject(item);
    setCurrentImageIndex(0);
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
    }
  };

  return (
    <>
      <section id="portfolio" className="py-24 md:py-32 bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="section-title">Nosso Portfólio</span>
            <h2 className="section-heading mt-3 mb-4">
              Obras residenciais e corporativas premium
            </h2>
            <p className="section-subtitle mx-auto">
              Confira alguns de nossos projetos realizados.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className="portfolio-item rounded-sm overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(item)}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={item.cover}
                    alt={`${item.title} - Obra de alto padrão Castro Alves`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-primary font-sans text-sm uppercase tracking-wider">
                      {item.images.length > 1 ? `Ver ${item.images.length} Fotos` : 'Ver Projeto'}
                    </span>
                  </div>
                </div>
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

      {/* Lightbox with Carousel */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Fechar"
          >
            <X size={32} />
          </button>

          {/* Project title */}
          <h3 className="text-foreground font-serif text-xl mb-4">{selectedProject.title}</h3>

          {/* Image */}
          <div className="relative flex items-center justify-center w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            {selectedProject.images.length > 1 && (
              <button
                onClick={goPrev}
                className="absolute left-2 md:-left-14 z-10 bg-card/80 hover:bg-card text-foreground hover:text-primary rounded-full p-2 transition-colors"
                aria-label="Foto anterior"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            <img
              src={selectedProject.images[currentImageIndex]}
              alt={`${selectedProject.title} - Foto ${currentImageIndex + 1}`}
              className="max-w-full max-h-[75vh] object-contain animate-scale-in rounded-sm"
            />

            {selectedProject.images.length > 1 && (
              <button
                onClick={goNext}
                className="absolute right-2 md:-right-14 z-10 bg-card/80 hover:bg-card text-foreground hover:text-primary rounded-full p-2 transition-colors"
                aria-label="Próxima foto"
              >
                <ChevronRight size={28} />
              </button>
            )}
          </div>

          {/* Dots indicator */}
          {selectedProject.images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {selectedProject.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    idx === currentImageIndex ? 'bg-primary' : 'bg-muted-foreground/40'
                  }`}
                  aria-label={`Ir para foto ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Portfolio;
