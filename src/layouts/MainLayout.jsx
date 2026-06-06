import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { VideoBubble } from "@/components/common/VideoBubble";
import { MusicPlayer } from "@/components/common/MusicPlayer";
import { PageTransitions } from "@/components/layout/PageTransitions";
import { ScrollToTopOnNavigate } from "@/components/layout/ScrollToTopOnNavigate";

export function MainLayout() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen">
      {/* Scroll restoration on path change */}
      <ScrollToTopOnNavigate />
      
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <PageTransitions key={location.pathname}>
            <Outlet />
          </PageTransitions>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
      <VideoBubble />
      <MusicPlayer />
      <ScrollToTop />
    </div>
  );
}
