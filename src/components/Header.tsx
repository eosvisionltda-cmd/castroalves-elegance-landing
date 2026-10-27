import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import logo from '@/assets/logo-castro-alves.png';
const links = [{ href: 'portfolio', label: 'Obras' }, { href: 'servicos', label: 'Atuação' }, { href: 'quem-somos', label: 'A Castro Alves' }];
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    handleScroll(); window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => { setIsOpen(false); }, [pathname]);
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);
  const navigate = (id: string) => { setIsOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  return (
    <header className={`luxury-header ${isScrolled ? 'luxury-header-scrolled' : ''}`}>
      <div className="luxury-header-inner">
        <a href="/" className="luxury-logo" aria-label="Castro Alves Construções, início"><img src={logo} alt="Castro Alves Construções" /></a>
        <nav className="luxury-desktop-nav" aria-label="Navegação principal">{links.map(link => <button key={link.href} onClick={() => navigate(link.href)}>{link.label}</button>)}</nav>
        <button className="luxury-header-contact" onClick={() => navigate('contato')}>Fale sobre seu projeto<ArrowUpRight size={15} /></button>
        <button className="luxury-menu-toggle" aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
      </div>
      {isOpen && <nav id="mobile-navigation" className="luxury-mobile-nav" aria-label="Navegação principal no celular">{links.map(link => <button key={link.href} onClick={() => navigate(link.href)}>{link.label}<ArrowUpRight size={18} /></button>)}<button onClick={() => navigate('contato')}>Fale sobre seu projeto<ArrowUpRight size={18} /></button></nav>}
    </header>
  );
};
export default Header;
