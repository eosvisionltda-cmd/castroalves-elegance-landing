import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Send, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '@/lib/tracking';
import { supabase } from '@/integrations/supabase/client';

const contactSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório').max(100),
  phone: z.string().trim().refine(value => /^\d{10,11}$/.test(value.replace(/\D/g, '')), 'Informe o telefone com DDD'),
  email: z.string().email('Email inválido').max(255),
  location: z.string().min(2, 'Localização é obrigatória').max(200),
  area: z.string().min(1, 'Metragem é obrigatória').max(50),
  serviceType: z.enum(['Construção', 'Reforma', 'Gerenciamento de obras'], { errorMap: () => ({ message: 'Selecione o tipo de serviço' }) }),
  startWhen: z.enum(['Até 3 meses', 'De 3 a 6 meses', 'Mais de 6 meses', 'Ainda estou planejando'], { errorMap: () => ({ message: 'Selecione a previsão de início' }) }),
  message: z.string().max(1000).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const serviceOptions = [
  'Construção',
  'Reforma',
  'Gerenciamento de obras',
];

const ContactForm = ({ defaultService }: { defaultService?: ContactFormData['serviceType'] }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { serviceType: defaultService },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const { data: result, error } = await supabase.functions.invoke('send-email', {
        body: {
          ...data,
          message: [`Previsão de início: ${data.startWhen}`, data.message].filter(Boolean).join('\n\n'),
          source: 'contact_form',
        },
      });

      if (error || !result?.success) throw error || new Error("Envio não confirmado");
      trackEvent("lead_form", { service_type: data.serviceType });

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
            <h2 className="section-heading mt-3 mb-4">Conte-nos sobre a sua obra</h2>
            <p className="section-subtitle mx-auto">
              Construção, reforma ou gerenciamento de alto padrão. Informe os detalhes para avaliarmos sua solicitação e entrarmos em contato.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-sans text-foreground/70 mb-2">
                  Nome Completo *
                </label>
                <input
                  id="name"
                  {...register('name')}
                  type="text"
                  placeholder="Seu nome completo"
                  className="input-field"
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-sans text-foreground/70 mb-2">
                  Telefone *
                </label>
                <input
                  id="phone"
                  {...register('phone')}
                  type="tel"
                  placeholder="(11) 99999-9999"
                  className="input-field"
                />
                {errors.phone && (
                  <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-sans text-foreground/70 mb-2">
                  E-mail *
                </label>
                <input
                  id="email"
                  {...register('email')}
                  type="email"
                  placeholder="seu@email.com"
                  className="input-field"
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-sans text-foreground/70 mb-2">
                  Localização da Obra *
                </label>
                <input
                  id="location"
                  {...register('location')}
                  type="text"
                  placeholder="Cidade / Bairro"
                  className="input-field"
                />
                {errors.location && (
                  <p className="text-destructive text-sm mt-1">{errors.location.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Area */}
              <div>
                <label htmlFor="area" className="block text-sm font-sans text-foreground/70 mb-2">
                  Metragem Aproximada *
                </label>
                <input
                  id="area"
                  {...register('area')}
                  type="text"
                  placeholder="Ex: 120m²"
                  className="input-field"
                />
                {errors.area && (
                  <p className="text-destructive text-sm mt-1">{errors.area.message}</p>
                )}
              </div>

              {/* Service Type */}
              <div>
                <label htmlFor="serviceType" className="block text-sm font-sans text-foreground/70 mb-2">
                  Tipo de Serviço *
                </label>
                <select
                  id="serviceType"
                  {...register('serviceType')}
                  className="input-field"
                  defaultValue={defaultService || ""}
                >
                  <option value="" disabled>Selecione...</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {errors.serviceType && (
                  <p className="text-destructive text-sm mt-1">{errors.serviceType.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="startWhen" className="block text-sm font-sans text-foreground/70 mb-2">Quando pretende iniciar? *</label>
              <select id="startWhen" {...register('startWhen')} defaultValue="" className="input-field">
                <option value="" disabled>Selecione a previsão de início</option>
                {['Até 3 meses', 'De 3 a 6 meses', 'Mais de 6 meses', 'Ainda estou planejando'].map(value => <option key={value} value={value}>{value}</option>)}
              </select>
              {errors.startWhen && <p className="text-destructive text-sm mt-1">{errors.startWhen.message}</p>}
            </div>
            <p className="text-sm text-muted-foreground">Usaremos seus dados para responder à solicitação e conversar sobre a obra informada.</p>
            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-sans text-foreground/70 mb-2">
                Mensagem (opcional)
              </label>
              <textarea
                id="message"
                  {...register('message')}
                rows={4}
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
                    Enviar Solicitação
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
