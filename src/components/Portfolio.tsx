import { useState } from 'react';
import { X } from 'lucide-react';
import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import portfolio4 from '@/assets/portfolio-4.jpg';
import portfolio5 from '@/assets/portfolio-5.jpg';
import portfolio6 from '@/assets/portfolio-6.jpg';

const portfolioItems = [
  { image: portfolio1, title: 'Sala de Estar', category: 'Reforma Residencial' },
  { image: portfolio2, title: 'Cozinha Gourmet', category: 'Reforma Residencial' },
  { image: portfolio3, title: 'Banheiro Master', category: 'Reforma Residencial' },
  { image: portfolio4, title: 'Suíte Principal', category: 'Reforma Residencial' },
  { image: portfolio5, title: 'Home Office', category: 'Reforma Comercial' },
  { image: portfolio6, title: 'Varanda Gourmet', category: 'Reforma Residencial' },
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
              Projetos realizados
            </h2>
            <p className="section-subtitle mx-auto">
              Confira alguns de nossos projetos realizados.
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className="portfolio-item aspect-square rounded-sm"
                onClick={() => setSelectedImage(item.image)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {/* Hover overlay with info */}
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs uppercase tracking-wider text-primary font-sans">
                    {item.category}
                  </span>
                  <span className="font-serif text-xl text-foreground">
                    {item.title}
                  </span>
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
