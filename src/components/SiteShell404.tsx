"use client";

import dynamic from "next/dynamic";

// The root 404 is serialised into every page's RSC payload, the /yverdon sponsor pages included.
// Loading the site shell on demand keeps the marketing navigation and footer out of pages that
// never render the 404, while the 404 itself still gets them.
const SiteShell = dynamic(() => import("@/components/SiteShell").then((m) => m.SiteShell));

export function SiteShell404({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
