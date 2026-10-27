import { useState } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import living from '@/assets/og-obra-3.webp';
import kitchen from '@/assets/og-obra-1.webp';
import bedroom from '@/assets/og-obra-6.webp';
import { getServicePage } from '@/lib/services';

const photographs = [
  { src: living, alt: 'Living do apartamento O|G, com madeira, iluminação e acabamentos executados pela Castro Alves', detail: 'Materialidade e luz' },
  { src: kitchen, alt: 'Cozinha do apartamento O|G com bancada de pedra e marcenaria', detail: 'Precisão nos acabamentos' },
  { src: bedroom, alt: 'Suíte do apartamento O|G com cabeceira de pedra, madeira e iluminação integrada', detail: 'Cuidado em cada ambiente' },
];

const Hero = ({ service }: { service?: ReturnType<typeof getServicePage> }) => {
  const [active, setActive] = useState(0);
  const photo = photographs[active];
  const wording = service?.label === 'Construção'
    ? { eyebrow: 'Construção de casas de alto padrão', first: 'O seu projeto.', last: 'Uma execução à altura.', description: 'Do projeto arquitetônico ao último acabamento, cuidado na execução da casa que você imaginou.' }
    : service?.label === 'Reforma'
    ? { eyebrow: 'Reformas de apartamentos e casas', first: 'Alto padrão.', last: 'Em cada detalhe.', description: 'Uma nova forma de viver o seu espaço. Reformas de alto padrão com execução cuidadosa e acompanhamento próximo.' }
    : service?.label === 'Gerenciamento de obras'
    ? { eyebrow: 'Gerenciamento de obras de alto padrão', first: 'Um olhar atento.', last: 'Do início à entrega.', description: 'Acompanhamento da execução e alinhamento com fornecedores e parceiros para cuidar de cada escolha do seu projeto.' }
    : { eyebrow: 'Construção · Reformas · Gerenciamento', first: 'Alto padrão.', last: 'Em cada detalhe.', description: 'Obras que traduzem o seu projeto em espaços para viver. Construção, reformas e gerenciamento em São Paulo e região.' };
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="luxury-opening" aria-label="Castro Alves: obras de alto padrão">
      <div className="luxury-hero">
        <div className="luxury-hero-copy">
          <p className="luxury-eyebrow"><span />{wording.eyebrow}</p>
          <h1 className="luxury-title">{wording.first}<br /><em>{wording.last}</em></h1>
          <p className="luxury-description">{wording.description}</p>
          <div className="luxury-actions">
            <button onClick={() => scrollTo('contato')} className="luxury-button">Converse sobre sua obra<ArrowUpRight size={17} aria-hidden="true" /></button>
            <button onClick={() => scrollTo('portfolio')} className="luxury-text-link">Explorar portfólio<ArrowUpRight size={16} aria-hidden="true" /></button>
          </div>
          <div className="luxury-signature"><span>Castro Alves Construções</span><p>O cuidado na execução revela o valor de um projeto.</p></div>
        </div>
        <div className="luxury-hero-gallery">
          <img key={photo.src} src={photo.src} alt={photo.alt} className="luxury-hero-photo" fetchPriority="high" />
          <div className="luxury-photo-tag">{photo.detail}</div>
          <div className="luxury-photo-caption">
            <div><span className="luxury-caption-label">Portfólio Castro Alves</span><p>Apartamento O|G <span> / Itaim Bibi, SP</span></p></div>
            <div className="luxury-gallery-controls">
              <span aria-live="polite">0{active + 1}<span> / 03</span></span>
              <button aria-label="Foto anterior da obra" onClick={() => setActive((active + photographs.length - 1) % photographs.length)}><ArrowLeft size={17} /></button>
              <button aria-label="Próxima foto da obra" onClick={() => setActive((active + 1) % photographs.length)}><ArrowRight size={17} /></button>
            </div>
          </div>
        </div>
      </div>
      <div className="luxury-opening-bottom">
        <p>Construir. Transformar. Acompanhar.</p>
        <nav aria-label="Conheça nossos serviços">
          <Link to="/construcao-alto-padrao">Construção<ArrowUpRight size={13} /></Link>
          <Link to="/reformas-alto-padrao">Reformas<ArrowUpRight size={13} /></Link>
          <Link to="/gerenciamento-de-obras">Gerenciamento<ArrowUpRight size={13} /></Link>
        </nav>
        <small>Projeto arquitetônico e interiores: @arquitetofilipo</small>
      </div>
    </section>
  );
};
export default Hero;
