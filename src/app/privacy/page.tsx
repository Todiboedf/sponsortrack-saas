import type { Metadata } from "next";
import { Shield } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { GradientOrb } from "@/components/GradientOrb";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How SponsorTrack collects, uses and protects your personal data. EU data residency, GDPR-compliant, never used for shared model training.",
  alternates: { canonical: "https://sponsortrack.io/privacy" },
};

const LAST_UPDATED = "April 24, 2026";

export default function PrivacyPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-10 lg:pt-44">
        <GradientOrb color="violet" size={480} className="-left-40 -top-10" />
        <GradientOrb color="blue" size={420} className="-right-40 top-20" />
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-4">
            <Badge icon={<Shield size={13} />}>Legal</Badge>
            <h1 className="font-[family-name:var(--font-display)] text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl lg:text-[56px]">
              Privacy policy
            </h1>
            <p className="text-white/55">Last updated · {LAST_UPDATED}</p>
          </div>
        </Container>
      </section>

      <section className="pb-24 lg:pb-32">
        <Container>
          <article className="prose-dark mx-auto max-w-3xl">
            <p>
              This policy explains what personal data SponsorTrack (&ldquo;we&rdquo;,
              &ldquo;us&rdquo;) collects from visitors and customers, why we collect it,
              and how we keep it safe. It applies to sponsortrack.io and any
              SponsorTrack product or service that links to it.
            </p>

            <h2>1. Who we are</h2>
            <p>
              SponsorTrack is operated by SponsorTrack Labs S.A.S., registered in
              France. For any privacy-related request you can reach us at{" "}
              <a href="mailto:privacy@sponsortrack.io">privacy@sponsortrack.io</a>.
            </p>

            <h2>2. What we collect</h2>
            <ul>
              <li>
                <strong>Contact data you submit</strong> — name, work email, company,
                phone (optional), and the message you send through our forms.
              </li>
              <li>
                <strong>Account data</strong> (for customers only) — workspace name,
                billing address, invoices.
              </li>
              <li>
                <strong>Product data</strong> — public social metrics and broadcast
                assets you choose to connect to your workspace.
              </li>
              <li>
                <strong>Technical data</strong> — strictly necessary cookies, IP
                address, device &amp; browser used, anonymised analytics for page
                performance.
              </li>
            </ul>

            <h2>3. Why we process it</h2>
            <ul>
              <li>Respond to a request you sent (legitimate interest).</li>
              <li>Deliver the contracted service and bill for it (contract).</li>
              <li>
                Send product updates &mdash; only with your explicit consent, with a
                one-click opt-out in every email.
              </li>
              <li>Comply with accounting, tax and security obligations (legal).</li>
            </ul>

            <h2>4. Where we store it</h2>
            <p>
              By default, personal data is stored in the European Union (Ireland &amp;
              France). Enterprise customers can opt into alternative regions. Data is
              encrypted in transit (TLS 1.3) and at rest (AES-256). We never use your
              data to train shared machine-learning models.
            </p>

            <h2>5. Who we share it with</h2>
            <p>
              We share personal data only with vetted sub-processors strictly required
              to operate the service (hosting, transactional email, error tracking).
              A complete and up-to-date list is available on request. We do not sell
              personal data, ever.
            </p>

            <h2>6. How long we keep it</h2>
            <ul>
              <li>Contact form submissions: 24 months after the last exchange.</li>
              <li>Customer data: for the life of the contract, plus 6 months.</li>
              <li>Invoices: 10 years, as required by French tax law.</li>
            </ul>

            <h2>7. Your rights</h2>
            <p>
              Under the GDPR you have the right to access, rectify, port, delete, or
              restrict the processing of your personal data, and to object to it at
              any time. Email{" "}
              <a href="mailto:privacy@sponsortrack.io">privacy@sponsortrack.io</a> and
              we&apos;ll respond within 30 days. You may also lodge a complaint with
              your local data-protection authority (in France, the CNIL).
            </p>

            <h2>8. Cookies</h2>
            <p>
              We use strictly necessary cookies only. No analytics tracking cookies,
              no third-party advertising cookies, no cross-site pixels.
            </p>

            <h2>9. Changes</h2>
            <p>
              When we make material changes to this policy we will update the
              &ldquo;Last updated&rdquo; date at the top and notify active customers
              by email.
            </p>
          </article>
        </Container>
      </section>
    </>
  );
}
