"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chyron } from "@/components/ui/Chyron";
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
          <Chyron>Sign in</Chyron>
          <h1 className="font-[family-name:var(--font-archivo)] text-balance text-3xl font-bold leading-[1.06] tracking-[-0.02em] text-[#F4EFE6] sm:text-4xl">
            Access your sponsor workspace.
          </h1>
        </div>

        <div className="mt-8 inline-flex rounded-[8px] border border-[#F4EFE6]/[0.10] bg-[#F4EFE6]/[0.02] p-1 text-[13px]">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`rounded-[6px] px-4 py-1.5 transition ${
              mode === "signin" ? "bg-[#D8FF3E] font-medium text-[#0A1628]" : "text-[#F4EFE6]/70 hover:text-[#F4EFE6]"
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`rounded-[6px] px-4 py-1.5 transition ${
              mode === "signup" ? "bg-[#D8FF3E] font-medium text-[#0A1628]" : "text-[#F4EFE6]/70 hover:text-[#F4EFE6]"
            }`}
          >
            Create account
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-6 flex flex-col gap-4 rounded-lg border border-[#F4EFE6]/[0.10] bg-[#0E1D33]/70 p-6"
        >
          <label className="flex flex-col gap-2 text-[13px] text-[#F4EFE6]/70">
            Email
            <div className="flex items-center gap-2 rounded-[6px] border border-[#F4EFE6]/[0.10] bg-[#050B14]/60 px-3 py-2.5 focus-within:border-[#D8FF3E]/50">
              <Mail size={14} className="text-[#F4EFE6]/40" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-[14px] text-[#F4EFE6] outline-none"
                placeholder="you@brand.com"
              />
            </div>
          </label>

          <label className="flex flex-col gap-2 text-[13px] text-[#F4EFE6]/70">
            Password
            <div className="flex items-center gap-2 rounded-[6px] border border-[#F4EFE6]/[0.10] bg-[#050B14]/60 px-3 py-2.5 focus-within:border-[#D8FF3E]/50">
              <Lock size={14} className="text-[#F4EFE6]/40" />
              <input
                type="password"
                required
                minLength={8}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent text-[14px] text-[#F4EFE6] outline-none"
                placeholder="At least 8 characters"
              />
            </div>
          </label>

          {error && (
            <div className="rounded-[6px] border border-[#E8A33D]/40 bg-[#E8A33D]/10 px-3 py-2 text-[13px] text-[#F2C689]">
              {error}
            </div>
          )}
          {info && (
            <div className="rounded-[6px] border border-[#D8FF3E]/35 bg-[#D8FF3E]/10 px-3 py-2 text-[13px] text-[#E9FF80]">
              {info}
            </div>
          )}

          <Button type="submit" disabled={busy} size="md" rightIcon={<ArrowRight size={15} />}>
            {busy ? "..." : mode === "signin" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-[12px] text-[#F4EFE6]/40">
          Need help? <a className="text-[#F4EFE6]/70 underline" href="/contact">Contact us</a>.
        </p>
      </Container>
    </section>
  );
}
