import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { GradientOrb } from "@/components/GradientOrb";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "SponsorTrack terms of service. Plain-language rules governing your use of the product and website.",
  alternates: { canonical: "https://sponsortrack.io/terms" },
};

const LAST_UPDATED = "April 24, 2026";

export default function TermsPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-10 lg:pt-44">
        <GradientOrb color="violet" size={480} className="-left-40 -top-10" />
        <GradientOrb color="blue" size={420} className="-right-40 top-20" />
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-4">
            <Badge icon={<FileText size={13} />}>Legal</Badge>
            <h1 className="font-[family-name:var(--font-display)] text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl lg:text-[56px]">
              Terms of service
            </h1>
            <p className="text-white/55">Last updated · {LAST_UPDATED}</p>
          </div>
        </Container>
      </section>

      <section className="pb-24 lg:pb-32">
        <Container>
          <article className="prose-dark mx-auto max-w-3xl">
            <p>
              These terms govern your access to and use of the SponsorTrack website
              and any related product (together, the &ldquo;Service&rdquo;), operated
              by SponsorTrack Labs S.A.S. By using the Service you agree to them. If
              you don&apos;t, please don&apos;t use the Service.
            </p>

            <h2>1. Accounts</h2>
            <p>
              You&apos;re responsible for keeping your credentials safe and for any
              activity on your workspace. Tell us immediately at{" "}
              <a href="mailto:security@sponsortrack.io">security@sponsortrack.io</a>{" "}
              if you suspect unauthorised access.
            </p>

            <h2>2. Fees &amp; free trial</h2>
            <p>
              Paid plans are billed monthly or annually in advance. The 14-day free
              trial requires no credit card and can be cancelled at any time. If you
              don&apos;t convert to a paid plan, your workspace is archived and may
              be permanently deleted after 30 days.
            </p>

            <h2>3. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Break applicable laws or infringe third-party rights.</li>
              <li>Attempt to probe, scan, or reverse-engineer the Service.</li>
              <li>Resell, sublicense or expose the Service to third parties outside the scope of your subscription.</li>
              <li>Upload content you don&apos;t have the right to use.</li>
            </ul>

            <h2>4. Intellectual property</h2>
            <p>
              The Service, our brand, and our algorithms remain our property. Your
              data remains yours. You grant us the minimum licence required to operate
              the Service on your behalf.
            </p>

            <h2>5. Availability</h2>
            <p>
              We aim for 99.9% uptime (99.95% on Enterprise). Scheduled maintenance
              windows are announced at least 48 hours in advance on our status page.
            </p>

            <h2>6. Termination</h2>
            <p>
              You can cancel at any time from inside the product. We can terminate
              accounts that breach these terms, with reasonable notice where possible.
              On termination we delete your data within 60 days, unless legal
              retention obligations apply.
            </p>

            <h2>7. Warranty &amp; liability</h2>
            <p>
              The Service is provided &ldquo;as is&rdquo;. To the extent permitted by
              law, our aggregate liability for any claim is limited to the fees paid
              in the 12 months preceding the event giving rise to the claim.
            </p>

            <h2>8. Governing law</h2>
            <p>
              These terms are governed by French law. Any dispute will be submitted
              to the competent courts of Paris, France, unless your country&apos;s
              consumer-protection law requires otherwise.
            </p>

            <h2>9. Contact</h2>
            <p>
              Questions? Write to{" "}
              <a href="mailto:legal@sponsortrack.io">legal@sponsortrack.io</a>.
            </p>
          </article>
        </Container>
      </section>
    </>
  );
}
