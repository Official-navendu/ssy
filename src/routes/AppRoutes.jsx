import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";

// Lazy load pages for dynamic code-splitting and small initial bundle size
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Services = lazy(() => import("@/pages/Services"));
const Booking = lazy(() => import("@/pages/Booking"));
const Products = lazy(() => import("@/pages/Products"));
const Contact = lazy(() => import("@/pages/Contact"));
const StoneDetail = lazy(() => import("@/pages/StoneDetail"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Elegant, lightweight custom spinner matching the luxury spiritual theme
function PageLoader() {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center bg-transparent relative">
      <div className="h-9 w-9 rounded-full border-2 border-gold/15 border-t-gold animate-spin" style={{ animationDuration: "1s" }} />
      <span className="mt-4 font-display text-xs tracking-[0.25em] text-gold uppercase animate-pulse">
        Loading alignment...
      </span>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/book" element={<Navigate to="/booking" replace />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/stones/:stoneId" element={<StoneDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
