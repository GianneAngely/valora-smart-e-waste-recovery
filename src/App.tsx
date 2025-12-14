import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/layout/AppShell";
import { Onboarding } from "@/components/onboarding/Onboarding";
import { SplashScreen } from "@/components/SplashScreen";

import HomePage from "./pages/HomePage";
import ScanPage from "./pages/ScanPage";
import GuidePage from "./pages/GuidePage";
import MarketPage from "./pages/MarketPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import LearnPage from "./pages/LearnPage";
import AboutPage from "./pages/AboutPage";
import SafetyPage from "./pages/SafetyPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function Root() {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  const handleSplashComplete = () => {
    // always hide splash and go to onboarding regardless of previous completion
    setShowSplash(false);
    navigate("/onboarding");
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>

      {/* Routes present so onboarding can use navigation; splash overlays them until complete */}
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/market" element={<MarketPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/learn" element={<LearnPage />} />
        </Route>

        <Route path="/about" element={<AboutPage />} />
        <Route path="/safety" element={<SafetyPage />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
