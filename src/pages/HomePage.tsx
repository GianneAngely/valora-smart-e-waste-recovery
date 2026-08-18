import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { SafetyBadge } from '@/components/ui/SafetyBadge';
import { useNavigate } from 'react-router-dom';
import { ScanLine, BookOpen, TrendingUp, Zap, ChevronRight, Leaf, Recycle, Shield } from 'lucide-react';
import { VALORA_COMPONENTS } from '@/data/components';
import { INITIAL_IMPACT_STATS } from '@/data/mockData';
import { motion } from 'framer-motion';

export default function HomePage() {
  const navigate = useNavigate();
  const stats = INITIAL_IMPACT_STATS;

  const quickActions = [
    { icon: ScanLine, label: 'Live Scan', path: '/scan', color: 'from-primary to-primary-glow' },
    { icon: BookOpen, label: 'Panduan', path: '/guide', color: 'from-secondary to-caution' },
    { icon: TrendingUp, label: 'Dampak', path: '/dashboard', color: 'from-caution to-secondary' },
  ];

  const recentComponents = VALORA_COMPONENTS.slice(0, 4);

  return (
    <PageTransition>
      <div className="page-container pt-4 max-w-2xl mx-auto space-y-6">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-secondary p-6 text-primary-foreground"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl transform translate-x-8 -translate-y-8" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl transform -translate-x-4 translate-y-4" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Leaf className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">Green Tech Platform</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">Recovery E-Waste Aman</h1>
            <p className="text-sm opacity-90 mb-4">
              Identifikasi, pisahkan, dan berikan nilai baru pada komponen elektronik bekas.
            </p>
            <Button
              onClick={() => navigate('/scan')}
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 border-0 font-semibold shadow-md"
            >
              Mulai Scan <ScanLine className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.section>

        {/* Quick Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="floating-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-safe-light flex items-center justify-center">
              <Recycle className="w-5 h-5 text-safe" />
            </div>
            <div>
              <p className="tnum text-2xl font-bold tracking-tight">{stats.devicesRecovered}</p>
              <p className="text-xs text-muted-foreground">Perangkat</p>
            </div>
          </div>
          <div className="floating-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-caution-light flex items-center justify-center">
              <Zap className="w-5 h-5 text-caution" />
            </div>
            <div>
              <p className="tnum text-2xl font-bold tracking-tight">{stats.componentsReused}</p>
              <p className="text-xs text-muted-foreground">Komponen</p>
            </div>
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold mb-3">Aksi Cepat</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.path}
                onClick={() => navigate(action.path)}
                className="floating-card p-4 flex flex-col items-center gap-2 hover:shadow-lg transition-shadow active:scale-95"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                  <action.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Recent Components */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Komponen Terbaru</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/guide')}>
              Lihat semua <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {recentComponents.map((component) => (
              <div
                key={component.id}
                className="floating-card p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate('/guide')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{component.name}</p>
                    <p className="text-xs text-muted-foreground">{component.category}</p>
                  </div>
                </div>
                <SafetyBadge level={component.safety} size="sm" showLabel={false} />
              </div>
            ))}
          </div>
        </motion.section>

        {/* SDG Banner */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="floating-card p-4 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-safe to-caution flex items-center justify-center flex-shrink-0">
            <span className="text-primary-foreground font-bold text-sm">SDG</span>
          </div>
          <div>
            <p className="font-medium text-sm">Mendukung SDG 4, 9, 10</p>
            <p className="text-xs text-muted-foreground">Pendidikan, Industri & Inovasi, Pengurangan Ketimpangan</p>
          </div>
        </motion.section>
      </div>
    </PageTransition>
  );
}
