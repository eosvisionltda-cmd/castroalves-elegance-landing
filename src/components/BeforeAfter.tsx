import { useId, useState, type PointerEvent } from 'react';
import { MoveHorizontal } from 'lucide-react';
type BeforeAfterProps = { before: string; after: string; beforeAlt: string; afterAlt: string; note: string };
const BeforeAfter = ({ before, after, beforeAlt, afterAlt, note }: BeforeAfterProps) => {
  const [position, setPosition] = useState(50);
  const id = useId();
  const followMouse = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.buttons !== 0) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (bounds.width === 0) return;
    setPosition(Math.round(Math.min(100, Math.max(0, ((event.clientX - bounds.left) / bounds.width) * 100))));
  };
  return (
    <figure className="w-full">
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-primary text-xs tracking-widest uppercase">Simulação ilustrativa</span>
        <span className="text-muted-foreground text-xs"><span className="comparison-hint-mouse">Passe o mouse para comparar</span><span className="comparison-hint-touch">Arraste para comparar</span></span>
      </div>
      <div className="comparison-frame" onPointerMove={followMouse}>
        <img src={after} alt={afterAlt} className="comparison-image" loading="lazy" draggable={false} />
        <div className="comparison-before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img src={before} alt={beforeAlt} className="comparison-image" loading="lazy" draggable={false} />
        </div>
        <span className="comparison-label comparison-label-before">Antes</span>
        <span className="comparison-label comparison-label-after">Depois</span>
        <div className="comparison-divider" style={{ left: `${position}%` }} aria-hidden="true"><span><MoveHorizontal size={22} /></span></div>
        <input type="range" min="0" max="100" step="1" value={position}
          onChange={event => setPosition(Number(event.target.value))}
          aria-label="Comparar antes e depois" aria-describedby={id}
          aria-valuetext={`${position}% da imagem de antes visível`}
          className="comparison-input" />
      </div>
      <figcaption id={id} className="text-muted-foreground text-xs leading-relaxed mt-3">{note}</figcaption>
    </figure>
  );
};
export default BeforeAfter;

