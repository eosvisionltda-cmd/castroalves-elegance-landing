import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, MessageCircle, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const whatsappSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório').max(100),
  phone: z.string().min(10, 'Telefone é obrigatório').max(20),
  subject: z.string().min(2, 'Assunto é obrigatório').max(100),
});

type WhatsAppFormData = z.infer<typeof whatsappSchema>;

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WhatsAppFormData>({
    resolver: zodResolver(whatsappSchema),
  });

  const onSubmit = async (data: WhatsAppFormData) => {
    setIsSubmitting(true);

    try {
      // Send email in background
      supabase.functions.invoke('send-email', {
        body: {
          ...data,
          source: 'whatsapp',
        },
      }).catch((err) => console.error('Email send error:', err));

      // Open WhatsApp immediately
      const message = `Olá! Meu nome é ${data.name}.\nTelefone: ${data.phone}\nAssunto: ${data.subject}`;
      const phoneNumber = '5511986656269';
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      toast.success('Dados enviados! Abrindo WhatsApp...');
      reset();
      setIsOpen(false);
    } catch (err) {
      console.error('Error:', err);
      toast.error('Erro ao processar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 group"
        aria-label="Abrir WhatsApp"
      >
        <MessageCircle size={28} className="text-foreground" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-card border border-border rounded-sm p-8 w-full max-w-md animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-serif text-2xl text-foreground">
                  Fale Conosco
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Preencha os campos para iniciar a conversa
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Fechar"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-sans text-foreground/70 mb-2">
                  Nome *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Seu nome"
                  className="input-field"
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

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
                  <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-sans text-foreground/70 mb-2">
                  Assunto *
                </label>
                <input
                  {...register('subject')}
                  type="text"
                  placeholder="Ex: Orçamento de reforma"
                  className="input-field"
                />
                {errors.subject && (
                  <p className="text-destructive text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#25D366] text-foreground font-sans font-medium uppercase tracking-wide text-sm flex items-center justify-center gap-3 hover:bg-[#20bd5a] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Abrir WhatsApp
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppButton;
