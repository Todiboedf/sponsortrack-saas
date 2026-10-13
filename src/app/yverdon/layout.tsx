import type { Metadata, Viewport } from "next";

import { LangueFr } from "./_components/LangueFr";

// Pages sponsor Yverdon Sport : exemples construits sur une mesure reelle, montres aux sponsors
// par lien direct. Le club n'a rien valide : pas d'indexation.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1628",
  colorScheme: "light",
};

export default function YverdonLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div lang="fr" data-yv className="min-h-screen bg-white font-sans text-yv-body [color-scheme:light] selection:bg-yv-data-3/40">
      <LangueFr />
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-yv-ink"
      >
        Aller au contenu
      </a>
      {children}
    </div>
  );
}
