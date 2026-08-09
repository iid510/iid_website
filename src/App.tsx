import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SmoothScroll, { useLenis } from "./components/SmoothScroll";

function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);
  return null;
}
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import NewsPost from "./pages/NewsPost.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ImpactPage from "./pages/ImpactPage.tsx";
import TeamPage from "./pages/TeamPage.tsx";
import HeritagePage from "./pages/HeritagePage.tsx";
import EventsPage from "./pages/EventsPage.tsx";
import GalleryPage from "./pages/GalleryPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import Businesses from "./pages/Businesses.tsx";
import BusinessProfile from "./pages/BusinessProfile.tsx";
import JoinPage from "./pages/JoinPage.tsx";
import KingProfile from "./pages/KingProfile.tsx";
import TourismPage from "./pages/TourismPage.tsx";
import OjowoKingdomPage from "./pages/OjowoKingdomPage.tsx";
import JaparaKingdomPage from "./pages/JaparaKingdomPage.tsx";
import AtikoriKingdomPage from "./pages/AtikoriKingdomPage.tsx";
import OkeSopenKingdomPage from "./pages/OkeSopenKingdomPage.tsx";
import OkeAgboKingdomPage from "./pages/OkeAgboKingdomPage.tsx";
import ImopeIjebuPage from "./pages/ImopeIjebuPage.tsx";
import AparakiPage from "./pages/AparakiPage.tsx";
import DonatePage from "./pages/DonatePage.tsx";
import AnnouncementsPage from "./pages/AnnouncementsPage.tsx";
import MembersPage from "./pages/MembersPage.tsx";
import ScholarshipPage from "./pages/ScholarshipPage.tsx";
import TravelGuidePage from "./pages/TravelGuidePage.tsx";
import VideoArchivePage from "./pages/VideoArchivePage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import HonourRollPage from "./pages/HonourRollPage.tsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.tsx";
import MyIIDPage from "./pages/MyIIDPage.tsx";
import FindYourRootsPage from "./pages/FindYourRootsPage.tsx";
import IdentityCardPage from "./pages/IdentityCardPage.tsx";
import GuidedTour from "./components/GuidedTour.tsx";
import InstallPrompt from "./components/InstallPrompt.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SmoothScroll>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/"            element={<Index />} />
          <Route path="/about"       element={<AboutPage />} />
          <Route path="/impact"      element={<ImpactPage />} />
          <Route path="/team"        element={<TeamPage />} />
          <Route path="/heritage"    element={<HeritagePage />} />
          <Route path="/events"      element={<EventsPage />} />
          <Route path="/gallery"     element={<GalleryPage />} />
          <Route path="/contact"     element={<ContactPage />} />
          <Route path="/news"          element={<Navigate to="/blog" replace />} />
          <Route path="/tourism"       element={<TourismPage />} />
          <Route path="/ojowo"         element={<OjowoKingdomPage />} />
          <Route path="/japara"        element={<JaparaKingdomPage />} />
          <Route path="/atikori"       element={<AtikoriKingdomPage />} />
          <Route path="/oke-sopen"     element={<OkeSopenKingdomPage />} />
          <Route path="/oke-agbo"      element={<OkeAgboKingdomPage />} />
          <Route path="/imope-ijebu"   element={<ImopeIjebuPage />} />
          <Route path="/aparaki"       element={<AparakiPage />} />
          <Route path="/donate"        element={<DonatePage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/members"       element={<MembersPage />} />
          <Route path="/scholarship"   element={<ScholarshipPage />} />
          <Route path="/travel"        element={<TravelGuidePage />} />
          <Route path="/videos"        element={<VideoArchivePage />} />
          <Route path="/news/:id"    element={<NewsPost />} />
          <Route path="/blog"        element={<BlogPage />} />
          <Route path="/blog/:slug"  element={<BlogPost />} />
          <Route path="/honour-roll" element={<HonourRollPage />} />
          <Route path="/privacy"     element={<PrivacyPolicyPage />} />
          <Route path="/businesses"          element={<Businesses />} />
          <Route path="/businesses/:slug"    element={<BusinessProfile />} />
          <Route path="/join"              element={<JoinPage />} />
          <Route path="/my-iid"            element={<MyIIDPage />} />
          <Route path="/roots"             element={<FindYourRootsPage />} />
          <Route path="/identity-card"     element={<IdentityCardPage />} />
          <Route path="/heritage/orimolusi/:slug" element={<KingProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*"            element={<NotFound />} />
        </Routes>
        <GuidedTour />
        <InstallPrompt />
      </BrowserRouter>
      </SmoothScroll>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
