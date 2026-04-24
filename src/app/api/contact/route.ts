import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  reason?: string;
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
  consent?: boolean;
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || name.length < 2 || name.length > 200) {
    return NextResponse.json({ error: "Name required" }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email) || email.length > 320) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }
  if (!message || message.length < 5 || message.length > 5000) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }
  if (!body.consent) {
    return NextResponse.json({ error: "Consent required" }, { status: 400 });
  }

  const endpoint = process.env.CONTACT_FORWARD_URL;
  const token = process.env.CONTACT_FORWARD_TOKEN;
  if (endpoint) {
    try {
      await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          reason: body.reason,
          name,
          email,
          company: body.company,
          phone: body.phone,
          message,
          receivedAt: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("contact forward failed", err);
      return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
    }
  } else {
    console.info("[contact] submission", { reason: body.reason, name, email, company: body.company });
  }

  return NextResponse.json({ ok: true });
}
