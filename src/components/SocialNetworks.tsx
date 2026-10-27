import { Instagram, ArrowUpRight, Facebook, Linkedin } from 'lucide-react';
import living from '@/assets/og-obra-3.webp';
import kitchen from '@/assets/og-obra-1.webp';
import dining from '@/assets/km-obra-1.webp';

const instagram = 'https://www.instagram.com/castroalvesconstrucoes/';
const images = [
  { src: living, alt: 'Detalhes de iluminação e acabamento de obra da Castro Alves' },
  { src: kitchen, alt: 'Cozinha executada pela Castro Alves, com pedra e marcenaria' },
  { src: dining, alt: 'Ambiente integrado de obra do portfólio Castro Alves' },
];
const SocialNetworks = () => (
  <section id="redes-sociais" className="py-20 md:py-28 bg-background" aria-labelledby="social-heading">
    <div className="container-custom">
      <div className="border border-primary/25 bg-card rounded-sm overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="p-7 sm:p-10 lg:p-12 flex flex-col items-start justify-center">
            <span className="section-title !text-xs">Acompanhe nas redes sociais</span>
            <h2 id="social-heading" className="section-heading mt-3 mb-5 !text-4xl md:!text-5xl">Cada obra tem uma história.<br />Acompanhe de perto.</h2>
            <p className="text-foreground/75 text-sm leading-relaxed max-w-lg">Veja os bastidores, a evolução das obras e os detalhes das nossas entregas no Instagram da Castro Alves.</p>
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-primary text-base sm:text-xl mt-7 break-all"><Instagram size={25} className="shrink-0" aria-hidden="true" />@castroalvesconstrucoes</a>
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 gap-3 !text-xs"><Instagram size={18} aria-hidden="true" />Acompanhar no Instagram<ArrowUpRight size={17} aria-hidden="true" /></a>
            <div className="flex flex-wrap gap-6 mt-7 text-xs text-muted-foreground">
              <a href="https://www.facebook.com/profile.php?id=61555315886711" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary"><Facebook size={15} aria-hidden="true" />Facebook</a>
              <a href="https://www.linkedin.com/in/castro-alves-constru%C3%A7%C3%B5es-056b01334/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary"><Linkedin size={15} aria-hidden="true" />LinkedIn</a>
            </div>
          </div>
          <div className="p-5 sm:p-7 lg:pl-0 flex flex-col justify-center">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {images.map(image => <a key={image.src} href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Conheça mais obras no Instagram da Castro Alves" className="group block overflow-hidden aspect-[3/5] border border-border"><img src={image.src} alt={image.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" /></a>)}
            </div>
            <p className="text-muted-foreground text-xs mt-4 text-center">Imagens do nosso portfólio. Mais obras e bastidores no Instagram.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
export default SocialNetworks;
