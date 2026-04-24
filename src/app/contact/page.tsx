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
  Sparkles,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GradientOrb } from "@/components/GradientOrb";
import { cn } from "@/lib/utils";

type FormState = "idle" | "submitting" | "success" | "error";

type Reason = "demo" | "trial" | "press" | "careers" | "other";

const reasonOptions: { value: Reason; label: string; description: string }[] = [
  {
    value: "demo",
    label: "Book a demo",
    description: "30 minutes with a product expert, mapped to your workflow.",
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
      <section className="relative overflow-hidden pt-36 pb-12 lg:pt-44">
        <GradientOrb color="violet" size={560} className="-left-40 -top-10" />
        <GradientOrb color="blue" size={520} className="-right-40 top-40" />
        <div aria-hidden className="absolute inset-0 -z-20 bg-grid mask-fade-radial opacity-30" />
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Badge icon={<Sparkles size={13} />}>Contact</Badge>
            <h1 className="mt-6 font-[family-name:var(--font-display)] text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl lg:text-[64px]">
              Let’s{" "}
              <span className="text-gradient-brand">talk sponsorships.</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg text-white/60 sm:text-xl">
              Whether you’re a top-tier club, an ambitious agency, a brand sponsor
              or a journalist — we usually reply same-day.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-24 lg:pb-32">
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
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/40">
                    <Check size={26} />
                  </div>
                  <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-white">
                    We got it.
                  </h3>
                  <p className="mt-3 max-w-sm text-[15px] text-white/60">
                    A human from our team will get back to you within one business
                    day — usually much sooner. Thanks for reaching out.
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
                    <div className="mb-3 text-[11px] uppercase tracking-[0.18em] text-white/45">
                      What brings you here?
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {reasonOptions.map((r) => (
                        <button
                          key={r.value}
                          type="button"
                          onClick={() => setReason(r.value)}
                          className={cn(
                            "rounded-xl border p-3 text-left transition-colors",
                            reason === r.value
                              ? "border-[#A78BFA]/60 bg-[#7C3AED]/10 ring-1 ring-[#7C3AED]/30"
                              : "border-white/[0.08] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "inline-block h-2 w-2 rounded-full",
                                reason === r.value
                                  ? "bg-[#A78BFA]"
                                  : "bg-white/30"
                              )}
                            />
                            <span className="text-[14px] font-medium text-white">
                              {r.label}
                            </span>
                          </div>
                          <div className="mt-1 text-[12px] text-white/50">
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
                        placeholder="jamie@realmadrid.com"
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Club / Company" icon={<Building2 size={14} />}>
                      <input
                        name="company"
                        autoComplete="organization"
                        placeholder="Real Madrid CF"
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

                  <label className="flex items-start gap-3 text-[13px] text-white/55">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      className="mt-0.5 h-4 w-4 cursor-pointer rounded border-white/20 bg-white/[0.05]"
                    />
                    <span>
                      I agree that SponsorTrack may contact me about my request and
                      store my information according to the{" "}
                      <a
                        href="/privacy"
                        className="text-white/80 underline underline-offset-4 hover:text-white"
                      >
                        privacy policy
                      </a>
                      .
                    </span>
                  </label>

                  {state === "error" && error && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-200"
                    >
                      Couldn&apos;t send — {error}. Email us directly at{" "}
                      <a
                        href="mailto:hello@sponsortrack.io"
                        className="underline underline-offset-4"
                      >
                        hello@sponsortrack.io
                      </a>
                      .
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-4 border-t border-white/[0.06] pt-6">
                    <div className="text-[12px] text-white/45">
                      We reply within one business day.
                    </div>
                    <Button
                      type="submit"
                      disabled={state === "submitting"}
                      rightIcon={
                        state === "submitting" ? (
                          <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
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
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                  Talk to a human
                </h3>
                <p className="mt-1 text-[14px] text-white/55">
                  Skip the form and reach the right person directly.
                </p>
                <ul className="mt-5 flex flex-col gap-4">
                  <Contact
                    icon={<Mail size={16} />}
                    label="Sales & partnerships"
                    value="hello@sponsortrack.io"
                    href="mailto:hello@sponsortrack.io"
                  />
                  <Contact
                    icon={<Mail size={16} />}
                    label="Press"
                    value="press@sponsortrack.io"
                    href="mailto:press@sponsortrack.io"
                  />
                  <Contact
                    icon={<Mail size={16} />}
                    label="Support"
                    value="support@sponsortrack.io"
                    href="mailto:support@sponsortrack.io"
                  />
                </ul>
              </Card>

              <Card className="p-7">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                  Where we are
                </h3>
                <p className="mt-1 text-[13px] text-white/55">
                  Remote-first, EU-based. On-site meetings on request.
                </p>
                <ul className="mt-5 flex flex-col gap-4">
                  <Office city="Paris" address="Primary hub" tz="CET" />
                  <Office city="Europe" address="Across France, Spain, Portugal" tz="CET · WET" />
                </ul>
              </Card>

              <Card className="p-7">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/30">
                    <Clock size={16} />
                  </span>
                  <div>
                    <div className="font-medium text-white">
                      Same-day response
                    </div>
                    <div className="text-[12px] text-white/55">
                      9:00–19:00 CET, Monday to Friday.
                    </div>
                  </div>
                </div>
                <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-[13px] leading-relaxed text-white/60">
                  <span className="text-white/80">Tip —</span> mentioning your club
                  or brand name lets us route you directly to the right success
                  manager.
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
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 text-[14px] text-white placeholder:text-white/35 transition-colors outline-none focus:border-[#A78BFA]/60 focus:bg-white/[0.04] focus:ring-2 focus:ring-[#7C3AED]/30";

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
      <span className="inline-flex items-center gap-2 text-[12px] font-medium text-white/60">
        {icon && <span className="text-white/45">{icon}</span>}
        {label}
        {required && <span className="text-[#A78BFA]">*</span>}
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
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-white/75 ring-1 ring-white/10">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
          {label}
        </div>
        <a
          href={href}
          className="block truncate text-[14px] text-white/85 hover:text-white"
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
      <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-white/75 ring-1 ring-white/10">
        <MapPin size={16} />
      </span>
      <div>
        <div className="flex items-center gap-2 font-medium text-white">
          {city}
          <span className="rounded-full border border-white/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-white/55">
            {tz}
          </span>
        </div>
        <div className="text-[12px] text-white/55">{address}</div>
      </div>
    </li>
  );
}
