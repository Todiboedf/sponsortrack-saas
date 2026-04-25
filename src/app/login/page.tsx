"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setInfo(null);

    if (mode === "signup") {
      const { error: err } = await supabase.auth.signUp({ email, password });
      if (err) {
        setError(err.message);
      } else {
        setInfo("Check your inbox to confirm your address before signing in.");
      }
    } else {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) {
        setError(err.message);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    }
    setBusy(false);
  }

  return (
    <section className="pt-32 pb-20 lg:pt-40">
      <Container className="max-w-md">
        <div className="flex flex-col items-start gap-5">
          <Badge icon={<Lock size={13} />}>Sign in</Badge>
          <h1 className="font-[family-name:var(--font-display)] text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-4xl">
            Access your{" "}
            <span className="text-gradient-brand">sponsor workspace</span>.
          </h1>
        </div>

        <div className="mt-8 inline-flex rounded-full border border-white/[0.08] bg-white/[0.02] p-1 text-[13px]">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`rounded-full px-4 py-1.5 transition ${
              mode === "signin" ? "bg-white text-black" : "text-white/70 hover:text-white"
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`rounded-full px-4 py-1.5 transition ${
              mode === "signup" ? "bg-white text-black" : "text-white/70 hover:text-white"
            }`}
          >
            Create account
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-6 flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
        >
          <label className="flex flex-col gap-2 text-[13px] text-white/70">
            Email
            <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-black/40 px-3 py-2.5 focus-within:border-white/20">
              <Mail size={14} className="text-white/40" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-[14px] text-white outline-none"
                placeholder="you@brand.com"
              />
            </div>
          </label>

          <label className="flex flex-col gap-2 text-[13px] text-white/70">
            Password
            <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-black/40 px-3 py-2.5 focus-within:border-white/20">
              <Lock size={14} className="text-white/40" />
              <input
                type="password"
                required
                minLength={8}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent text-[14px] text-white outline-none"
                placeholder="At least 8 characters"
              />
            </div>
          </label>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-[13px] text-red-200">
              {error}
            </div>
          )}
          {info && (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-[13px] text-emerald-200">
              {info}
            </div>
          )}

          <Button type="submit" disabled={busy} size="md" rightIcon={<ArrowRight size={15} />}>
            {busy ? "..." : mode === "signin" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-[12px] text-white/40">
          Need help? <a className="text-white/70 underline" href="/contact">Contact us</a>.
        </p>
      </Container>
    </section>
  );
}
