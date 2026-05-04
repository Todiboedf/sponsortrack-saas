import type { Metadata } from "next";
import { ArrowLeft, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GradientOrb } from "@/components/GradientOrb";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist (or not yet).",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pt-36 pb-32 lg:pt-44">
      <GradientOrb color="red" size={520} className="-left-40 -top-10" />
      <GradientOrb color="gold" size={480} className="-right-40 top-40" />
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Badge icon={<Compass size={13} />}>404</Badge>
          <h1 className="mt-6 font-[family-name:var(--font-display)] text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl">
            We lost that one in the{" "}
            <span className="text-gradient-brand">broadcast.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-white/60">
            The page you&apos;re looking for doesn&apos;t exist, or hasn&apos;t
            shipped yet. Head back to the home page or explore the product.
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
      </Container>
    </section>
  );
}
