import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cadastro = () => {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-lg text-center animate-fade-up">
        <CheckCircle size={64} className="text-primary mx-auto mb-6" />
        <h1 className="section-heading mb-4">Mensagem Enviada!</h1>
        <p className="section-subtitle mx-auto mb-8">
          Obrigado por entrar em contato. Nossa equipe receberá sua mensagem e retornará o mais breve possível.
        </p>
        <Link to="/" className="btn-primary">
          Voltar ao Início
        </Link>
      </div>
    </main>
  );
};

export default Cadastro;
