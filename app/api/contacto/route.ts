import nodemailer from "nodemailer";

/**
 * Formulario de contacto (el mismo comportamiento que tenía la web anterior en api/contacto.js).
 * El envío va primero por el servidor de Kelatos (el SMTP guardado en Vercel falla con EAUTH); si no responde, se usa el SMTP de Vercel.
 * Antispam: campo trampa «website» y tiempo mínimo de 2 s desde que se cargó el formulario (a esos se les responde «ok» sin enviar nada).
 */
const RELAY_URL = process.env.WEB_CONTACTO_URL || "https://db.affirmatechnology.com/kelatos-api/webhooks/web-contacto";
const CORREO_RE = /^[^\s@"(),:;<>[\]\\]+@[^\s@"(),:;<>[\]\\]+\.[a-z]{2,}$/i;

const limpio = (v: unknown, max = 4000) => String(v ?? "").replace(/[<>]/g, "").trim().slice(0, max);

async function viaKelatos(asunto: string, texto: string, responderA: string): Promise<boolean> {
  try {
    const r = await fetch(RELAY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sitio: "flujopro", nombre_sitio: "FlujoPro", asunto, texto, responder_a: responderA }),
      signal: AbortSignal.timeout(15_000),
    });
    const j = (await r.json().catch(() => ({}))) as { ok?: boolean };
    return r.ok && j.ok === true;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const b = ((await req.json().catch(() => null)) || {}) as Record<string, unknown>;
    if (limpio(b.website)) return Response.json({ ok: true });
    const ts = Number(b.ts);
    if (!ts || Date.now() - ts < 2000) return Response.json({ ok: true });
    const nombre = limpio(b.nombre, 120), empresa = limpio(b.empresa, 160), email = limpio(b.email, 180), telefono = limpio(b.telefono, 60), mensaje = limpio(b.mensaje);
    if (!nombre || !empresa || !email || !telefono || !mensaje || !CORREO_RE.test(email)) return Response.json({ ok: false }, { status: 400 });

    const asunto = "Nueva consulta - FlujoPro Automatización de Flujos de Trabajo";
    const texto = `Nombre: ${nombre}\nEmpresa: ${empresa}\nEmail: ${email}\nTeléfono: ${telefono}\n\n${mensaje}`;
    if (!(await viaKelatos(asunto, texto, email))) {
      const transporte = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 465),
        secure: String(process.env.SMTP_SECURE ?? "true") === "true",
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporte.sendMail({ from: `"FlujoPro" <${process.env.SMTP_USER}>`, to: process.env.CONTACT_EMAIL || process.env.SMTP_USER, replyTo: email, subject: asunto, text: texto });
    }
    return Response.json({ ok: true });
  } catch (e) {
    console.error("contacto:", e instanceof Error ? e.message : e);
    return Response.json({ ok: false }, { status: 500 });
  }
}
