import { useId, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';
type BeforeAfterProps = { before: string; after: string; beforeAlt: string; afterAlt: string; note: string };
const BeforeAfter = ({ before, after, beforeAlt, afterAlt, note }: BeforeAfterProps) => {
  const [position, setPosition] = useState(50);
  const id = useId();
  return (
    <figure className="w-full">
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-primary text-xs tracking-widest uppercase">Simulação ilustrativa</span>
        <span className="text-muted-foreground text-xs">Arraste para comparar</span>
      </div>
      <div className="comparison-frame">
        <img src={after} alt={afterAlt} className="comparison-image" loading="lazy" draggable={false} />
        <div className="comparison-before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img src={before} alt={beforeAlt} className="comparison-image" loading="lazy" draggable={false} />
        </div>
        <span className="comparison-label comparison-label-before">Antes</span>
        <span className="comparison-label comparison-label-after">Depois</span>
        <div className="comparison-divider" style={{ left: `${position}%` }} aria-hidden="true"><span><MoveHorizontal size={22} /></span></div>
        <input type="range" min="0" max="100" step="1" value={position}
          onChange={event => setPosition(Number(event.target.value))}
          aria-label="Arraste para comparar antes e depois" aria-describedby={id}
          aria-valuetext={`${position}% da imagem de antes visível`}
          className="comparison-input" />
      </div>
      <figcaption id={id} className="text-muted-foreground text-xs leading-relaxed mt-3">{note}</figcaption>
    </figure>
  );
};
export default BeforeAfter;
