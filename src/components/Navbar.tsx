"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/customers/osasuna", label: "Customers", match: "/customers" },
  { href: "/changelog", label: "Changelog" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-[#0A1628]/85 border-b border-[#F4EFE6]/[0.06]"
          : "border-b border-transparent"
      )}
    >
      <Container>
        <nav
          aria-label="Primary"
          className="flex h-16 items-center justify-between"
        >
          <div className="flex flex-col">
            <Logo />
            <Link
              href="/about"
              className="mt-0.5 hidden pl-[40px] text-[10px] leading-none text-[#F4EFE6]/55 transition-colors hover:text-[#B8975A] sm:inline-block"
            >
              Built solo by Guillaume.
            </Link>
          </div>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => {
              const matchPath = l.match ?? l.href;
              const active =
                pathname === l.href ||
                (matchPath !== "/" && pathname?.startsWith(matchPath));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm text-[#F4EFE6]/72 transition-colors hover:text-[#F4EFE6]",
                    active && "text-[#F4EFE6]"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-[#F4EFE6]/[0.06] ring-1 ring-[#B8975A]/30"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Button href="/login" variant="ghost" size="sm">
              Sign in
            </Button>
            <Button href="/contact" size="sm">
              Start free trial
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#F4EFE6]/12 bg-[#F4EFE6]/[0.04] text-[#F4EFE6]"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-[#F4EFE6]/[0.06] bg-[#0A1628]/96 backdrop-blur-xl"
          >
            <Container>
              <div className="flex flex-col gap-1 py-5">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="rounded-xl px-3 py-3 text-base text-[#F4EFE6]/85 hover:bg-[#F4EFE6]/[0.06]"
                  >
                    {l.label}
                  </Link>
                ))}
                <div className="mt-3 flex flex-col gap-2 border-t border-[#F4EFE6]/[0.06] pt-4">
                  <Button href="/login" variant="secondary" size="md">
                    Sign in
                  </Button>
                  <Button href="/contact" size="md">
                    Start free trial
                  </Button>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
