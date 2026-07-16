import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";

const FOUNDER_EMAIL = "guillaume.haas.nice@gmail.com";

const nav = {
  Product: [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/changelog", label: "Changelog" },
    { href: "/demo", label: "Live demo" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: `mailto:${FOUNDER_EMAIL}`, label: "Email the founder" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: `mailto:${FOUNDER_EMAIL}?subject=DPA%20request`, label: "DPA" },
    { href: `mailto:${FOUNDER_EMAIL}?subject=Security`, label: "Security" },
  ],
};

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-[#F4EFE6]/[0.08] bg-[#050B14]">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-[#F4EFE6]/60">
              Measured, not estimated. Sponsor exposure measured daily,
              reported Mondays 07:00.
            </p>
            <div className="flex items-center gap-2">
              <SocialIcon
                label="LinkedIn"
                href="https://www.linkedin.com/in/guillaumehaas"
              />
            </div>
          </div>
          {Object.entries(nav).map(([title, items]) => (
            <div key={title} className="flex flex-col gap-4">
              <div className="font-expanded text-[11px] font-semibold text-[#F4EFE6]/45">
                {title}
              </div>
              <ul className="flex flex-col gap-2.5">
                {items.map((l) => {
                  const isMail = l.href.startsWith("mailto:");
                  if (isMail) {
                    return (
                      <li key={l.label}>
                        <a
                          href={l.href}
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
        <div className="flex flex-col gap-3 border-t border-[#F4EFE6]/[0.08] py-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.12em] text-[#F4EFE6]/45 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} Sponsorlens · built solo by Guillaume
            Haas, in public
          </div>
          <div className="flex items-center gap-2">
            <span aria-hidden className="h-1.5 w-1.5 bg-[#D8FF3E]" />
            <span>Nice, France · EU data residency</span>
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
      className="inline-flex h-9 w-9 items-center justify-center rounded-[6px] border border-[#F4EFE6]/12 bg-[#F4EFE6]/[0.03] text-[#F4EFE6]/72 transition-colors hover:border-[#D8FF3E]/55 hover:text-[#D8FF3E]"
    >
      <span className="text-[11px] font-semibold">{label[0]}</span>
    </a>
  );
}
