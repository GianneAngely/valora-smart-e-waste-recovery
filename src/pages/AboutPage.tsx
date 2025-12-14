import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Leaf, Target, Users, Lightbulb, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="page-container pt-4 max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-glow">
            <Leaf className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-2">VALORA</h1>
          <p className="text-muted-foreground">Value Recovery from E-Waste</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="floating-card p-6 space-y-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Misi Kami</h3>
              <p className="text-sm text-muted-foreground">
                VALORA hadir untuk membantu masyarakat Indonesia melakukan recovery komponen e-waste secara aman dan bertanggung jawab. Kami percaya bahwa setiap komponen elektronik bekas memiliki nilai yang bisa diselamatkan.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-caution/10 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-caution" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Mengapa VALORA?</h3>
              <p className="text-sm text-muted-foreground">
                Indonesia menghasilkan lebih dari 2 juta ton e-waste setiap tahun. Sebagian besar berakhir di tempat pembuangan tanpa pemrosesan yang benar. VALORA membantu mengubah pola pikir dari "buang" menjadi "selamatkan".
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-safe/10 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-safe" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Untuk Siapa?</h3>
              <p className="text-sm text-muted-foreground">
                VALORA dirancang untuk siapa saja—dari pelajar, hobbyist, hingga teknisi profesional—yang ingin belajar cara menangani e-waste dengan benar dan berkontribusi pada ekonomi sirkular.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="floating-card p-6"
        >
          <h3 className="font-semibold mb-4">Mendukung SDG</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-muted/50">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg mb-2">
                4
              </div>
              <p className="text-xs text-muted-foreground">Quality Education</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-caution to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg mb-2">
                9
              </div>
              <p className="text-xs text-muted-foreground">Industry & Innovation</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-safe to-primary flex items-center justify-center text-primary-foreground font-bold text-lg mb-2">
                10
              </div>
              <p className="text-xs text-muted-foreground">Reduced Inequalities</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-muted-foreground"
        >
          <p>VALORA v1.0.0</p>
          <p>Built with 💚 for a greener future</p>
        </motion.div>
      </div>
    </PageTransition>
  );
}
