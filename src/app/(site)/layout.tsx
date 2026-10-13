import { SiteShell } from "@/components/SiteShell";

const SITE_URL = "https://sponsorlens.io";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sponsorlens",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description:
    "Sponsor exposure measurement for clubs, leagues and brands: social analytics, weekly reporting, broadcast computer vision in development.",
  sameAs: ["https://www.linkedin.com/in/guillaumehaas"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "guillaume.haas.nice@gmail.com",
      availableLanguage: ["English", "French", "Spanish"],
    },
  ],
};

// Marketing site: navigation, footer and Organization JSON-LD. The sponsor pages (/yverdon)
// sit outside this group and render none of it.
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteShell>{children}</SiteShell>
    </>
  );
}
