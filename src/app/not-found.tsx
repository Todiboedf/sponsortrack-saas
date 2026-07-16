import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HudFrame } from "@/components/ui/HudFrame";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist, or not yet.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pt-32 pb-28 lg:pt-40">
      <Container>
        <div className="mx-auto max-w-2xl">
          <HudFrame label="404 · no detection" tone="dim" className="bg-[#0E1D33]/60">
            <div className="flex flex-col items-center px-8 py-16 text-center">
              <h1 className="font-[family-name:var(--font-archivo)] text-balance text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-[#F4EFE6] sm:text-5xl">
                We lost that one in the broadcast.
              </h1>
              <p className="mt-6 max-w-lg text-lg text-[#F4EFE6]/60">
                The page you&apos;re looking for doesn&apos;t exist, or
                hasn&apos;t shipped yet. Head back to the home page or explore
                the product.
              </p>
              <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
                <Button href="/" leftIcon={<ArrowLeft size={15} />}>
                  Back to home
                </Button>
                <Button href="/features" variant="outline">
                  Explore features
                </Button>
              </div>
            </div>
          </HudFrame>
        </div>
      </Container>
    </section>
  );
}
