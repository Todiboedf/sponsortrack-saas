import type { Metadata, Viewport } from "next";

import { LangueFr } from "./_components/LangueFr";
import "./tableau.css";

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
  colorScheme: "dark",
};

export default function YverdonLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div lang="fr" className="yvd">
      <LangueFr />
      <a className="skip" href="#contenu">
        Aller au contenu
      </a>
      {children}
    </div>
  );
}
