import { useEffect, useRef } from 'react';

export function useScrollReveal(page: string) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const container = root.current;
    if (!container || !('IntersectionObserver' in window)) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const selectors = [
      'section:not(.portfolio-mural) .section-title',
      'section:not(.portfolio-mural) .section-heading',
      'section:not(.portfolio-mural) .section-subtitle',
      '#servicos .grid > a', '#servicos .service-step', '#quem-somos .grid > div',
      '#portfolio .portfolio-item', '#redes-sociais .container-custom > div', '#contato form',
    ];
    const elements = Array.from(container.querySelectorAll<HTMLElement>(selectors.join(',')));
    let observer: IntersectionObserver | undefined;
    const reveal = (element: HTMLElement) => {
      element.classList.add('is-revealed');
      observer?.unobserve(element);
    };
    const clear = () => {
      observer?.disconnect();
      elements.forEach(element => {
        element.classList.remove('scroll-reveal', 'is-revealed');
        element.style.removeProperty('--reveal-delay');
      });
    };
    const setup = () => {
      clear();
      if (motion.matches) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) reveal(entry.target as HTMLElement); });
      }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
      elements.forEach(element => {
        element.classList.add('scroll-reveal');
        if (element.matches('#servicos .grid > a, #servicos .service-step, #portfolio .portfolio-item')) {
          const siblings = Array.from(element.parentElement?.children || []);
          element.style.setProperty('--reveal-delay', `${(siblings.indexOf(element) % 3) * 80}ms`);
        }
        observer?.observe(element);
      });
    };
    // Keyboard navigation must reveal focused content immediately.
    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof Node) elements.forEach(element => { if (element.contains(event.target as Node)) reveal(element); });
    };
    setup();
    motion.addEventListener('change', setup);
    container.addEventListener('focusin', onFocus);
    return () => { clear(); motion.removeEventListener('change', setup); container.removeEventListener('focusin', onFocus); };
  }, [page]);
  return root;
}
