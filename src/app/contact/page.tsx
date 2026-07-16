"use client";

import { useState } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Chyron } from "@/components/ui/Chyron";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type FormState = "idle" | "submitting" | "success" | "error";

type Reason = "demo" | "trial" | "press" | "careers" | "other";

const reasonOptions: { value: Reason; label: string; description: string }[] = [
  {
    value: "demo",
    label: "Book a demo",
    description: "30 minutes with the founder, mapped to your workflow.",
  },
  {
    value: "trial",
    label: "Start a free trial",
    description: "14 days on the Pro plan, no credit card required.",
  },
  {
    value: "press",
    label: "Press & media",
    description: "Media kits, interview requests, co-branded content.",
  },
  {
    value: "careers",
    label: "Careers",
    description: "Open roles, internships, referrals.",
  },
  {
    value: "other",
    label: "Something else",
    description: "Partnerships, integrations, generic curiosity.",
  },
];

export default function ContactPage() {
  const [reason, setReason] = useState<Reason>("demo");
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reason,
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          company: String(data.get("company") ?? ""),
          phone: String(data.get("phone") ?? ""),
          message: String(data.get("message") ?? ""),
          consent: data.get("consent") === "on",
          website: String(data.get("website") ?? ""),
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Something went wrong");
      }
      setState("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setState("error");
    }
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-[#F4EFE6]/[0.06] bg-[#050B14] pt-28 pb-12 lg:pt-36 lg:pb-14">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-50" />
        <Container className="relative">
          <div className="max-w-3xl">
            <Chyron>Contact · straight to the founder</Chyron>
            <h1 className="mt-6 font-[family-name:var(--font-archivo)] text-balance text-[44px] font-bold leading-[1.02] tracking-[-0.025em] text-[#F4EFE6] sm:text-6xl">
              Let&apos;s talk sponsorships.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg text-[#F4EFE6]/60 sm:text-xl">
              Whether you&apos;re a top-tier club, an ambitious agency, a brand
              sponsor or a journalist, you usually get a same-day reply.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 lg:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
            {/* Form */}
            <Card className="p-8 lg:p-10">
              {state === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center border border-[#D8FF3E]/50 text-[#D8FF3E]">
                    <Check size={26} />
                  </div>
                  <h3 className="mt-6 font-[family-name:var(--font-archivo)] text-2xl font-bold tracking-tight text-[#F4EFE6]">
                    We got it.
                  </h3>
                  <p className="mt-3 max-w-sm text-[15px] text-[#F4EFE6]/60">
                    The founder will get back to you within one business day,
                    usually much sooner. Thanks for reaching out.
                  </p>
                  <div className="mt-8">
                    <Button href="/" variant="outline">
                      Back to home
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-6">
                  <div>
                    <div className="mb-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[#F4EFE6]/45">
                      What brings you here?
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {reasonOptions.map((r) => (
                        <button
                          key={r.value}
                          type="button"
                          onClick={() => setReason(r.value)}
                          className={cn(
                            "rounded-[6px] border p-3 text-left transition-colors",
                            reason === r.value
                              ? "border-[#D8FF3E]/60 bg-[#D8FF3E]/[0.06]"
                              : "border-[#F4EFE6]/[0.08] bg-[#F4EFE6]/[0.02] hover:border-[#F4EFE6]/15 hover:bg-[#F4EFE6]/[0.04]"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "inline-block h-2 w-2",
                                reason === r.value ? "bg-[#D8FF3E]" : "bg-[#F4EFE6]/30"
                              )}
                            />
                            <span className="text-[14px] font-medium text-[#F4EFE6]">
                              {r.label}
                            </span>
                          </div>
                          <div className="mt-1 text-[12px] text-[#F4EFE6]/50">
                            {r.description}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" icon={<User size={14} />} required>
                      <input
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="Jamie Martinez"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Work email" icon={<Mail size={14} />} required>
                      <input
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="jamie@yourclub.com"
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Club / Company" icon={<Building2 size={14} />}>
                      <input
                        name="company"
                        autoComplete="organization"
                        placeholder="Your club or brand"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Phone (optional)" icon={<Phone size={14} />}>
                      <input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+34 6 12 34 56 78"
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <Field
                    label="How can we help?"
                    icon={<MessageSquare size={14} />}
                    required
                  >
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your current setup, the sponsors you manage, and what you'd like to measure."
                      className={cn(inputCls, "resize-none py-3")}
                    />
                  </Field>

                  <label className="flex items-start gap-3 text-[13px] text-[#F4EFE6]/55">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      className="mt-0.5 h-4 w-4 cursor-pointer rounded border-[#F4EFE6]/20 bg-[#F4EFE6]/[0.05]"
                    />
                    <span>
                      I agree that Sponsorlens may contact me about my request and
                      store my information according to the{" "}
                      <a
                        href="/privacy"
                        className="text-[#F4EFE6]/80 underline underline-offset-4 hover:text-[#F4EFE6]"
                      >
                        privacy policy
                      </a>
                      .
                    </span>
                  </label>

                  {state === "error" && error && (
                    <div
                      role="alert"
                      className="rounded-[6px] border border-[#E8A33D]/40 bg-[#E8A33D]/10 px-4 py-3 text-[13px] text-[#F2C689]"
                    >
                      Couldn&apos;t send, {error}. Email us directly at{" "}
                      <a
                        href="mailto:guillaume.haas.nice@gmail.com"
                        className="underline underline-offset-4"
                      >
                        guillaume.haas.nice@gmail.com
                      </a>
                      .
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-4 border-t border-[#F4EFE6]/[0.06] pt-6">
                    <div className="text-[12px] text-[#F4EFE6]/45">
                      We reply within one business day.
                    </div>
                    <Button
                      type="submit"
                      disabled={state === "submitting"}
                      rightIcon={
                        state === "submitting" ? (
                          <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-[#0A1628]/60 border-t-transparent" />
                        ) : (
                          <Send size={15} />
                        )
                      }
                    >
                      {state === "submitting" ? "Sending…" : "Send message"}
                    </Button>
                  </div>
                </form>
              )}
            </Card>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              <Card className="p-7">
                <h3 className="font-[family-name:var(--font-archivo)] text-lg font-semibold text-[#F4EFE6]">
                  Talk to a human
                </h3>
                <p className="mt-1 text-[14px] text-[#F4EFE6]/55">
                  Skip the form and reach the founder directly.
                </p>
                <ul className="mt-5 flex flex-col gap-4">
                  <Contact
                    icon={<Mail size={16} />}
                    label="Everything goes to the founder"
                    value="guillaume.haas.nice@gmail.com"
                    href="mailto:guillaume.haas.nice@gmail.com"
                  />
                </ul>
              </Card>

              <Card className="p-7">
                <h3 className="font-[family-name:var(--font-archivo)] text-lg font-semibold text-[#F4EFE6]">
                  Where we are
                </h3>
                <p className="mt-1 text-[13px] text-[#F4EFE6]/55">
                  Remote-first, EU-based. On-site meetings on request.
                </p>
                <ul className="mt-5 flex flex-col gap-4">
                  <Office city="Nice, France" address="Home base · EU data residency" tz="CET" />
                </ul>
              </Card>

              <Card className="p-7">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center border border-[#D8FF3E]/40 text-[#D8FF3E]">
                    <Clock size={16} />
                  </span>
                  <div>
                    <div className="font-medium text-[#F4EFE6]">
                      Same-day response
                    </div>
                    <div className="font-[family-name:var(--font-mono)] text-[11px] text-[#F4EFE6]/55">
                      9:00–19:00 CET · Mon–Fri
                    </div>
                  </div>
                </div>
                <div className="mt-5 rounded-[6px] border border-[#F4EFE6]/[0.06] bg-[#F4EFE6]/[0.02] p-4 text-[13px] leading-relaxed text-[#F4EFE6]/60">
                  <span className="text-[#F4EFE6]/80">Tip —</span> mention your
                  club or brand name and the founder can prepare the walkthrough
                  around your actual sponsors.
                </div>
                <div className="mt-5">
                  <Button
                    href="/demo"
                    variant="outline"
                    size="sm"
                    rightIcon={<ArrowRight size={14} />}
                  >
                    Or try the live demo
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

const inputCls =
  "w-full rounded-[6px] border border-[#F4EFE6]/[0.10] bg-[#F4EFE6]/[0.02] px-3.5 py-2.5 text-[14px] text-[#F4EFE6] placeholder:text-[#F4EFE6]/35 transition-colors outline-none focus:border-[#D8FF3E]/60 focus:bg-[#F4EFE6]/[0.04] focus:ring-2 focus:ring-[#D8FF3E]/25";

function Field({
  label,
  icon,
  required,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="inline-flex items-center gap-2 text-[12px] font-medium text-[#F4EFE6]/60">
        {icon && <span className="text-[#F4EFE6]/45">{icon}</span>}
        {label}
        {required && <span className="text-[#D8FF3E]">*</span>}
      </span>
      {children}
    </label>
  );
}

function Contact({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <li className="flex items-center gap-3">
      <span className="inline-flex h-9 w-9 items-center justify-center border border-[#F4EFE6]/10 bg-[#F4EFE6]/[0.04] text-[#F4EFE6]/75">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[#F4EFE6]/40">
          {label}
        </div>
        <a
          href={href}
          className="block truncate text-[14px] text-[#F4EFE6]/85 hover:text-[#F4EFE6]"
        >
          {value}
        </a>
      </div>
    </li>
  );
}

function Office({
  city,
  address,
  tz,
}: {
  city: string;
  address: string;
  tz: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center border border-[#F4EFE6]/10 bg-[#F4EFE6]/[0.04] text-[#F4EFE6]/75">
        <MapPin size={16} />
      </span>
      <div>
        <div className="flex items-center gap-2 font-medium text-[#F4EFE6]">
          {city}
          <span className="border border-[#F4EFE6]/15 px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#F4EFE6]/55">
            {tz}
          </span>
        </div>
        <div className="text-[12px] text-[#F4EFE6]/55">{address}</div>
      </div>
    </li>
  );
}
