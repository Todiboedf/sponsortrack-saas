import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";

const nav = {
  Product: [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/customers/osasuna", label: "Customers" },
    { href: "/changelog", label: "Changelog" },
    { href: "/demo", label: "Live demo" },
    { href: "https://status.sponsortrack.io", label: "Status", external: true },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "mailto:hello@sponsortrack.io?subject=Blog%20RSS", label: "Blog" },
    { href: "mailto:careers@sponsortrack.io", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "mailto:privacy@sponsortrack.io?subject=DPA%20request", label: "DPA" },
    { href: "mailto:security@sponsortrack.io", label: "Security" },
  ],
};

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-[#F4EFE6]/[0.06]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-fade-b opacity-40"
      />
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-[#F4EFE6]/60">
              Sponsor intelligence, lived in real time. Built for clubs and
              leagues that close renewals.
            </p>
            <Link
              href="/about"
              className="inline-flex w-fit items-center gap-1.5 text-[12px] text-[#F4EFE6]/60 transition-colors hover:text-[#B8975A]"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#B8975A]" />
              Built solo by Guillaume.
            </Link>
            <div className="flex items-center gap-2">
              <SocialIcon label="X" href="https://x.com/sponsortrack" />
              <SocialIcon label="LinkedIn" href="https://www.linkedin.com/company/sponsortrack" />
              <SocialIcon label="YouTube" href="https://youtube.com" />
            </div>
          </div>
          {Object.entries(nav).map(([title, items]) => (
            <div key={title} className="flex flex-col gap-4">
              <div className="font-[family-name:var(--font-display)] text-[12px] font-semibold uppercase tracking-[0.22em] text-[#B8975A]">
                {title}
              </div>
              <ul className="flex flex-col gap-2.5">
                {items.map((l) => {
                  const isExternal = "external" in l && l.external;
                  const isMail = l.href.startsWith("mailto:");
                  if (isExternal || isMail) {
                    return (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          {...(isExternal
                            ? { target: "_blank", rel: "noreferrer noopener" }
                            : {})}
                          className="text-sm text-[#F4EFE6]/70 transition-colors hover:text-[#F4EFE6]"
                        >
                          {l.label}
                        </a>
                      </li>
                    );
                  }
                  return (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-[#F4EFE6]/70 transition-colors hover:text-[#F4EFE6]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 border-t border-[#F4EFE6]/[0.06] py-6 text-xs text-[#F4EFE6]/50 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} SponsorTrack · A solo project by{" "}
            <Link
              href="/about"
              className="text-[#F4EFE6]/65 underline underline-offset-4 hover:text-[#B8975A]"
            >
              Guillaume Haas
            </Link>{" "}
            · Madrid, Spain
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2F8F5A] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2F8F5A]" />
              </span>
              All systems operational
            </span>
            <span className="hidden sm:inline">EU-first · GDPR compliant</span>
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
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#F4EFE6]/12 bg-[#F4EFE6]/[0.03] text-[#F4EFE6]/72 transition-colors hover:border-[#B8975A]/55 hover:text-[#B8975A]"
    >
      <span className="text-[11px] font-semibold">{label[0]}</span>
    </a>
  );
}
