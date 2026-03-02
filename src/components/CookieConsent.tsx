import { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-up">
      <div className="container-custom">
        <div className="bg-card border border-border rounded p-6 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-elegant">
          <Cookie size={24} className="text-primary shrink-0 mt-1 md:mt-0" />
          <p className="text-sm text-muted-foreground font-sans flex-1">
            Utilizamos cookies para melhorar sua experiência de navegação, personalizar conteúdo e analisar nosso tráfego. 
            Ao clicar em "Aceitar", você concorda com o uso de cookies conforme nossa política de privacidade.
          </p>
          <div className="flex gap-3 shrink-0">
            <button onClick={decline} className="btn-outline !py-2 !px-5 !text-xs">
              Recusar
            </button>
            <button onClick={accept} className="btn-primary !py-2 !px-5 !text-xs">
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
