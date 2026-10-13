import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";

// Navigation, skip link and footer of the marketing site. Rendered by the (site) route group
// and the 404 page only, so pages outside the group (/yverdon) never ship them.
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-[#D8FF3E] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#0A1628]"
      >
        Skip to content
      </a>
      <MotionProvider>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </MotionProvider>
    </>
  );
}
