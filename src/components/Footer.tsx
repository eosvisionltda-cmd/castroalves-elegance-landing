import { Mail, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/logo-castro-alves.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-dark py-16">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <a href="#">
              <img
                src={logo}
                alt="Castro Alves Construções"
                className="h-24 md:h-32"
              />
            </a>
            <p className="text-muted-foreground font-sans text-sm mt-4 leading-relaxed max-w-xs">
              Transformando projetos em realidade com excelência, sofisticação e
              rigor técnico há mais de 5 anos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-4">
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              {[
                { href: '#quem-somos', label: 'Quem Somos' },
                { href: '#servicos', label: 'Nossos Serviços' },
                { href: '#portfolio', label: 'Portfólio' },
                { href: '#contato', label: 'Contato' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary font-sans text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-4">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground font-sans text-sm">
                <Phone size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span>(11) 98051-5092</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground font-sans text-sm">
                <Mail size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span>construcoescastroalves@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground font-sans text-sm">
                <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground font-sans text-sm">
              © {currentYear} Castro Alves Construções. Todos os direitos
              reservados.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary font-sans text-sm transition-colors"
              >
                Política de Privacidade
              </a>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-center mt-8 font-serif text-lg text-primary/70 italic">
            "Transformando projetos em realidade"
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
