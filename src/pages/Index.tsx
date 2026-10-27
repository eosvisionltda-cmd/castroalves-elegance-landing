import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getServicePage } from '@/lib/services';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Solutions from '@/components/Solutions';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  const { pathname } = useLocation();
  const service = getServicePage(pathname);
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${service?.title || 'Construção, reformas e gerenciamento de alto padrão'} | Castro Alves`;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', service?.description || 'Construção, reformas de alto padrão e gerenciamento de obras em São Paulo. Conheça o portfólio da Castro Alves e solicite seu orçamento.');
    const canonical = document.querySelector('link[rel="canonical"]');
    canonical?.setAttribute('href', `${window.location.origin}${pathname}`);
  }, [pathname, service]);
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero service={service} />
      <Solutions />
      <About />
      <Portfolio />
      <ContactForm key={pathname} defaultService={service?.label} />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Index;
