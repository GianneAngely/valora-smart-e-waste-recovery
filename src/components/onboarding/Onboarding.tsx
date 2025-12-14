import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";
import { useValoraToast } from "@/hooks/useToast";
import ValoraLogo from "/valora logo aja.svg";

const slides = [
  {
    title: "Selamat datang di VALORA",
    description:
      "Platform green tech untuk recovery komponen e-waste secara aman dan bertanggung jawab.",
  },
  {
    title: "Identifikasi & Recovery",
    description:
      "Gunakan Live Scan untuk mendeteksi komponen dan dapatkan panduan recovery yang aman.",
  },
  {
    title: "Keamanan Utama",
    description:
      "Setiap komponen memiliki tingkat keamanan: Aman, Perlu Hati-hati, atau Jangan Bongkar.",
  },
  {
    title: "Komunitas Reuse",
    description:
      "Jual atau donasikan komponen yang masih layak di Pasar VALORA.",
  },
];

export function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { completeOnboarding } = useSettings();
  const { toast } = useValoraToast();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      completeOnboarding();
      toast("Siap! Yuk mulai recovery 🚀", "success");
      navigate("/");
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    toast("Siap! Yuk mulai recovery 🚀", "success");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto rounded-3xl bg-white flex items-center justify-center mb-8 shadow-glow overflow-hidden p-2"
            >
              <img
                src={ValoraLogo}
                alt="VALORA Logo"
                className="w-full h-full object-contain"
              />
            </motion.div>

            <h1 className="text-2xl font-bold mb-4">
              {slides[currentSlide].title}
            </h1>
            <p className="text-muted-foreground max-w-xs mx-auto">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2 mt-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6 space-y-3">
        <Button
          onClick={handleNext}
          className="w-full h-14 text-lg gap-2"
          size="lg"
        >
          {currentSlide < slides.length - 1 ? "Lanjut" : "Mulai Sekarang"}
          <ArrowRight className="w-5 h-5" />
        </Button>
        {currentSlide < slides.length - 1 && (
          <Button variant="ghost" onClick={handleSkip} className="w-full">
            Lewati
          </Button>
        )}
      </div>
    </div>
  );
}
