import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import kitchen from '@/assets/og-obra-1.webp';
import living from '@/assets/og-obra-3.webp';
import bedroom from '@/assets/og-obra-6.webp';
import dining from '@/assets/km-obra-1.webp';
import { getServicePage } from '@/lib/services';

const works = [
  { image: kitchen, alt: 'Cozinha com bancada de pedra e marcenaria, apartamento O|G executado pela Castro Alves', title: 'Apartamento O|G', place: 'Itaim Bibi, São Paulo' },
  { image: living, alt: 'Living com madeira e iluminação, apartamento O|G executado pela Castro Alves', title: 'Apartamento O|G', place: 'Itaim Bibi, São Paulo' },
  { image: bedroom, alt: 'Suíte com acabamentos em pedra e madeira, apartamento O|G', title: 'Apartamento O|G', place: 'Itaim Bibi, São Paulo' },
  { image: dining, alt: 'Sala de jantar do apartamento K|M, obra de gerenciamento e execução da Castro Alves', title: 'Apartamento K|M', place: 'Jardim Paulista, São Paulo' },
];

const Hero = ({ service }: { service?: ReturnType<typeof getServicePage> }) => {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % works.length), 6000);
    return () => window.clearInterval(timer);
  }, [playing]);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section className="portfolio-mural" aria-label="Mural de obras executadas pela Castro Alves">
      <div className="mural-photos" aria-label="Fotos do portfólio">
        {[0, 1, 2].map(offset => {
          const work = works[(active + offset) % works.length];
          return <div className={`mural-panel mural-panel-${offset}`} key={offset}>
            <img key={work.image} src={work.image} alt={work.alt} className="mural-photo" fetchPriority={offset === 0 ? 'high' : 'auto'} />
            <div className="mural-work-caption"><span>{work.title}</span><small>{work.place}</small></div>
          </div>;
        })}
      </div>
      <div className="mural-shade" />
      <div className="mural-content container-custom">
        <span className="section-title">Obras que revelam nosso padrão</span>
        <h1>{service?.title || 'Alto padrão em cada obra. Castro Alves em cada detalhe.'}</h1>
        <p>{service?.description || 'Construção, reformas e gerenciamento de obras de alto padrão. Conheça os espaços que ajudamos a transformar em São Paulo e região.'}</p>
        <div className="mural-actions">
          <button onClick={() => scrollTo('contato')} className="btn-primary">Solicitar orçamento</button>
          <button onClick={() => scrollTo('portfolio')} className="btn-outline">Conhecer as obras</button>
        </div>
      </div>
      <div className="mural-bottom container-custom">
        <p>Portfólio Castro Alves<span>Execução e gerenciamento</span></p>
        <div className="mural-controls">
          <span aria-live="off">0{active + 1}<span> / 04</span></span>
          <button aria-label="Fotos anteriores do portfólio" onClick={() => { setPlaying(false); setActive((active + works.length - 1) % works.length); }}><ArrowLeft size={17} /></button>
          <button aria-label={playing ? 'Pausar mural' : 'Reproduzir mural'} onClick={() => setPlaying(!playing)}>{playing ? <Pause size={15} /> : <Play size={15} />}</button>
          <button aria-label="Próximas fotos do portfólio" onClick={() => { setPlaying(false); setActive((active + 1) % works.length); }}><ArrowRight size={17} /></button>
        </div>
      </div>
    </section>
  );
};
export default Hero;
