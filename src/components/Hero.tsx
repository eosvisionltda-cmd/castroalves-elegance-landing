import heroImage from '@/assets/hero-construction.jpg';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center py-32 md:py-40">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-block mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="section-title">Excelência em Engenharia</span>
          </div>

          {/* Title */}
          <h1
            className="section-heading text-5xl md:text-6xl lg:text-7xl mb-6 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            Soluções completas em construção
          </h1>

          {/* Subtitle */}
          <p
            className="section-subtitle mx-auto mb-10 animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            Projetos de alto padrão com excelência, sofisticação e rigor técnico.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            <button onClick={scrollToContact} className="btn-primary">
              Solicitar Orçamento
            </button>
            <button
              onClick={() => {
                const element = document.querySelector('#portfolio');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-outline"
            >
              Ver Portfólio
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-16 bg-gradient-to-b from-primary/50 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
