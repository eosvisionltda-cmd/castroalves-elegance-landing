import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface EmailRequest {
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message?: string;
  source: "contact_form" | "whatsapp";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const data: EmailRequest = await req.json();

    const isWhatsApp = data.source === "whatsapp";

    const subject = isWhatsApp
      ? `[WhatsApp] Novo contato de ${data.name} - ${data.subject || "Sem assunto"}`
      : `[Site] ${data.subject || "Novo contato"} - ${data.name}`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1a1a1a; border-bottom: 2px solid #c9a96e; padding-bottom: 10px;">
          ${isWhatsApp ? "📱 Contato via WhatsApp" : "📧 Contato pelo Site"}
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #555; width: 120px;">Nome:</td>
            <td style="padding: 10px; color: #1a1a1a;">${data.name}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; font-weight: bold; color: #555;">Telefone:</td>
            <td style="padding: 10px; color: #1a1a1a;">${data.phone}</td>
          </tr>
          ${data.email ? `
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #555;">Email:</td>
            <td style="padding: 10px; color: #1a1a1a;">${data.email}</td>
          </tr>` : ""}
          ${data.subject ? `
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; font-weight: bold; color: #555;">Assunto:</td>
            <td style="padding: 10px; color: #1a1a1a;">${data.subject}</td>
          </tr>` : ""}
          ${data.message ? `
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #555; vertical-align: top;">Mensagem:</td>
            <td style="padding: 10px; color: #1a1a1a;">${data.message}</td>
          </tr>` : ""}
        </table>
        <p style="color: #999; font-size: 12px; margin-top: 30px; text-align: center;">
          Castro Alves Construções — Enviado automaticamente pelo site
        </p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Castro Alves Construções <no-reply@castroalvesconstrucoes.com.br>",
        to: ["construcoescastroalves@gmail.com"],
        subject,
        html: htmlBody,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("Resend error:", result);
      throw new Error(result.message || "Failed to send email");
    }

    // Notificacao WhatsApp
    try {
      await fetch("https://castroalvesconstrucoes.com.br/notificar.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          subject: data.subject,
          message: data.message,
          source: data.source,
        }),
      });
    } catch (_) {}

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
