import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, AlertTriangle, MapPin, Phone } from 'lucide-react';
import { DROPOFF_CENTERS } from '@/data/mockData';
import { motion } from 'framer-motion';

const SAFETY_TIPS = [
  'Selalu matikan dan cabut daya perangkat sebelum membongkar.',
  'Gunakan sarung tangan dan kacamata pelindung.',
  'Jangan bongkar baterai, charger, atau power supply sendiri.',
  'Simpan komponen di tempat kering dan bebas debu.',
  'Pisahkan komponen berdasarkan jenis material.',
  'Jangan membakar atau membuang e-waste ke tempat sampah biasa.',
  'Serahkan komponen berbahaya ke drop-off center resmi.',
  'Cuci tangan setelah menangani komponen elektronik.',
];

export default function SafetyPage() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="page-container pt-4 max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Button>

        <div>
          <h1 className="text-2xl font-bold">Keamanan & Drop-off</h1>
          <p className="text-sm text-muted-foreground">
            Panduan keamanan dan lokasi penyerahan komponen berbahaya.
          </p>
        </div>

        {/* Safety Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="floating-card p-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-safe-light flex items-center justify-center">
              <Shield className="w-5 h-5 text-safe" />
            </div>
            <h3 className="font-semibold">Tips Keamanan</h3>
          </div>
          <ul className="space-y-2">
            {SAFETY_TIPS.map((tip, index) => (
              <li key={index} className="flex items-start gap-3 text-sm">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-xs font-medium">
                  {index + 1}
                </span>
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-restricted-light border border-restricted/20 rounded-2xl p-4"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-restricted flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-restricted">Peringatan Penting</p>
              <p className="text-sm text-muted-foreground mt-1">
                VALORA tidak menyediakan tutorial untuk ekstraksi material berbahaya dari komponen elektronik. Komponen dengan label "Jangan Bongkar" harus diserahkan ke fasilitas resmi.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Drop-off Centers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="floating-card p-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-caution-light flex items-center justify-center">
              <MapPin className="w-5 h-5 text-caution" />
            </div>
            <div>
              <h3 className="font-semibold">Drop-off Centers</h3>
              <p className="text-xs text-muted-foreground">20 lokasi di seluruh Indonesia</p>
            </div>
          </div>

          <ScrollArea className="h-64">
            <div className="space-y-2 pr-4">
              {DROPOFF_CENTERS.map((center) => (
                <div key={center.id} className="p-3 rounded-xl bg-muted/50">
                  <p className="font-medium text-sm">{center.name}</p>
                  <p className="text-xs text-muted-foreground">{center.address}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">{center.city}</span>
                    <a
                      href={`tel:${center.phone}`}
                      className="flex items-center gap-1 text-xs text-primary"
                    >
                      <Phone className="w-3 h-3" />
                      {center.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </motion.div>

        {/* Mini Map Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="floating-card p-4 overflow-hidden"
        >
          <div className="relative h-40 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <div className="absolute inset-0 opacity-50">
              <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-primary animate-ping" />
              <div className="absolute top-1/2 right-1/3 w-3 h-3 rounded-full bg-caution animate-ping delay-300" />
              <div className="absolute bottom-1/3 left-1/2 w-3 h-3 rounded-full bg-safe animate-ping delay-500" />
              <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-primary animate-ping delay-700" />
            </div>
            <div className="text-center z-10">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Peta Drop-off Centers</p>
              <p className="text-xs text-muted-foreground">20 lokasi tersebar di Indonesia</p>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
