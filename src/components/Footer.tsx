import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";

const nav = {
  Product: [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/demo", label: "Live demo" },
    { href: "/contact", label: "Request access" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/contact", label: "Careers" },
    { href: "/contact", label: "Press kit" },
  ],
  Resources: [
    { href: "/features", label: "Sponsor dashboard" },
    { href: "/features", label: "Match tracking" },
    { href: "/features", label: "ROI calculator" },
    { href: "/features", label: "Prospection engine" },
  ],
  Legal: [
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
    { href: "mailto:privacy@sponsortrack.io", label: "DPA on request" },
    { href: "mailto:security@sponsortrack.io", label: "Security" },
  ],
};

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/[0.06]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-fade-b opacity-40"
      />
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-white/55">
              The sponsor intelligence platform for clubs, leagues, and brands.
              Measure, prove, and grow partnership value.
            </p>
            <div className="flex items-center gap-2">
              <SocialIcon label="X" href="https://x.com" />
              <SocialIcon label="LinkedIn" href="https://linkedin.com" />
              <SocialIcon label="YouTube" href="https://youtube.com" />
            </div>
          </div>
          {Object.entries(nav).map(([title, items]) => (
            <div key={title} className="flex flex-col gap-4">
              <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-white/45">
                {title}
              </div>
              <ul className="flex flex-col gap-2.5">
                {items.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/65 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 border-t border-white/[0.06] py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} SponsorTrack Labs S.A.S. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              All systems operational
            </span>
            <span>Remote-first · Based in Paris</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function SocialIcon({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-colors hover:border-white/20 hover:text-white"
    >
      <span className="text-[11px] font-semibold">{label[0]}</span>
    </a>
  );
}
