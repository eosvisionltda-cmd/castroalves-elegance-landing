import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Send, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const contactSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório').max(100),
  phone: z.string().min(10, 'Telefone é obrigatório').max(20),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  subject: z.string().max(100).optional(),
  message: z.string().max(1000).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-email', {
        body: {
          ...data,
          source: 'contact_form',
        },
      });

      if (error) throw error;

      reset();
      navigate('/cadastro');
    } catch (err) {
      console.error('Error sending email:', err);
      toast.error('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-24 md:py-32 bg-secondary/30">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="section-title">Contato</span>
            <h2 className="section-heading mt-3 mb-4">Entre em Contato</h2>
            <p className="section-subtitle mx-auto">
              Preencha o formulário abaixo e entraremos em contato em breve.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-sans text-foreground/70 mb-2">
                  Nome *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Seu nome completo"
                  className="input-field"
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-sans text-foreground/70 mb-2">
                  Telefone *
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="(11) 99999-9999"
                  className="input-field"
                />
                {errors.phone && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-sans text-foreground/70 mb-2">
                  Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="seu@email.com"
                  className="input-field"
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-sans text-foreground/70 mb-2">
                  Assunto
                </label>
                <input
                  {...register('subject')}
                  type="text"
                  placeholder="Assunto do contato"
                  className="input-field"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-sans text-foreground/70 mb-2">
                Mensagem
              </label>
              <textarea
                {...register('message')}
                rows={5}
                placeholder="Conte-nos sobre seu projeto..."
                className="input-field resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary inline-flex items-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Enviar Mensagem
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
