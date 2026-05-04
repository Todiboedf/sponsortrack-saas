import { Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <Container>
        <SectionHeader
          eyebrow="What customers say"
          eyebrowIcon={<Users size={13} />}
          title={
            <>
              Real quotes,{" "}
              <em className="italic text-gradient-brand">names under NDA.</em>
            </>
          }
          description="Some of the clubs running SponsorTrack today aren't ready for a public landing page. The quotes below are real. The names will follow."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={`${t.author}-${i}`} delay={i * 0.07}>
              <Card className="h-full p-8">
                <div
                  aria-hidden
                  className="font-[family-name:var(--font-display)] text-6xl italic leading-none text-[#B8975A]/70"
                >
                  &ldquo;
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-[#F4EFE6]/85">
                  {t.quote}
                </p>
                <div className="mt-6 border-t border-[#F4EFE6]/[0.06] pt-5">
                  <div className="text-sm font-medium text-[#F4EFE6]">
                    {t.author}
                  </div>
                  <div className="mt-1 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#B8975A]/85">
                    {t.league}
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.25}>
          <p className="mt-10 text-center text-[13px] leading-relaxed text-[#F4EFE6]/55">
            Real quotes from existing customers. Names disclosed under NDA.{" "}
            <a
              href="mailto:guillaume@sponsortrack.io?subject=Live%20references"
              className="text-[#B8975A] underline underline-offset-4 hover:text-[#D8BC85]"
            >
              Drop me an email
            </a>{" "}
            to see live references.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
