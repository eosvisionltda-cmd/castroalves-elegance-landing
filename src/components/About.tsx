import aboutImage from '@/assets/about-tools.jpg';

const About = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="quem-somos" className="py-24 md:py-32 bg-secondary/30">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <span className="section-title">Quem Somos</span>
            <h2 className="section-heading mt-3 mb-8">
              Construção de alto padrão em São Paulo
            </h2>

            <div className="space-y-6 text-foreground/80 font-sans leading-relaxed">
              <p>
                A <strong>Castro Alves Construções</strong> é uma empresa de engenharia especializada em <strong>construção de alto padrão em São Paulo</strong>, 
                unindo excelência técnica, inovação e sofisticação em cada detalhe. Atuamos com <strong>obras no Centro de São Paulo</strong> e em todo o estado de São Paulo.
              </p>
              <p>
                Nosso compromisso é transformar ideias em obras de referência, atendendo projetos de <strong>condomínios de luxo</strong>, 
                residências premium e espaços corporativos em todo o estado, com soluções inteligentes, seguras e de qualidade.
              </p>
              <p>
                Com uma equipe de engenheiros altamente qualificados, oferecemos <strong>gestão completa de obras</strong>, 
                desde o planejamento até a entrega final, garantindo transparência, qualidade e rigor técnico em cada etapa.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 mb-10">
              {[
                { number: '5+', label: 'Anos de Experiência' },
                { number: '10.000+', label: 'm² Executados' },
                { number: '100%', label: 'Satisfação' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="font-serif text-4xl md:text-5xl text-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={scrollToContact} className="btn-primary">
              Solicitar Orçamento
            </button>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative overflow-hidden rounded-sm">
              <img
                src={aboutImage}
                alt="Ferramentas de engenharia e plantas para construção de alto padrão em São Paulo"
                className="w-full h-[400px] lg:h-[600px] object-cover"
                loading="lazy"
              />
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-primary/30 -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
