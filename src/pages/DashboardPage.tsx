import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Recycle, Zap, Leaf, Scale, TrendingUp, Clock, ChevronRight } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ImpactStats, ActivityLog } from '@/types/valora';
import { INITIAL_IMPACT_STATS, MOCK_ACTIVITY_LOGS } from '@/data/mockData';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

export default function DashboardPage() {
  const [stats] = useLocalStorage<ImpactStats>('valora-impact-stats', INITIAL_IMPACT_STATS);
  const [activityLogs] = useLocalStorage<ActivityLog[]>('valora-activity-logs', MOCK_ACTIVITY_LOGS);

  const statCards = [
    {
      icon: Recycle,
      label: 'Perangkat Di-recovery',
      value: stats.devicesRecovered,
      unit: 'unit',
      color: 'from-safe to-primary',
      bgColor: 'bg-safe-light',
    },
    {
      icon: Zap,
      label: 'Komponen Digunakan Ulang',
      value: stats.componentsReused,
      unit: 'komponen',
      color: 'from-caution to-secondary',
      bgColor: 'bg-caution-light',
    },
    {
      icon: Leaf,
      label: 'CO₂ Tersimpan',
      value: stats.co2Saved,
      unit: 'kg',
      color: 'from-primary to-safe',
      bgColor: 'bg-primary-light',
    },
    {
      icon: Scale,
      label: 'E-Waste Dikurangi',
      value: stats.wasteReduced,
      unit: 'kg',
      color: 'from-secondary to-caution',
      bgColor: 'bg-secondary-light',
    },
  ];

  return (
    <PageTransition>
      <div className="page-container pt-4 max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dampak Kamu</h1>
          <p className="text-sm text-muted-foreground">
            Lihat kontribusimu dalam mengurangi e-waste.
          </p>
        </div>

        {/* Hero Impact */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-secondary p-6 text-primary-foreground"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl transform translate-x-10 -translate-y-10" />
          
          <div className="relative z-10 text-center">
            <TrendingUp className="w-10 h-10 mx-auto mb-3 opacity-90" />
            <p className="text-sm opacity-80 mb-1">Total Kontribusi</p>
            <p className="text-4xl font-bold mb-1">{stats.co2Saved} kg</p>
            <p className="text-sm opacity-80">CO₂ tersimpan dari recovery e-waste</p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="floating-card p-4"
            >
              <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.unit}</p>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* SDG Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="floating-card p-4"
        >
          <h3 className="font-semibold mb-3">Kontribusi ke SDG</h3>
          <div className="space-y-3">
            {[
              { num: 4, title: 'Quality Education', desc: 'Edukasi recovery aman' },
              { num: 9, title: 'Industry & Innovation', desc: 'Circular economy e-waste' },
              { num: 10, title: 'Reduced Inequalities', desc: 'Akses teknologi reuse' },
            ].map((sdg) => (
              <div key={sdg.num} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {sdg.num}
                </div>
                <div>
                  <p className="font-medium text-sm">{sdg.title}</p>
                  <p className="text-xs text-muted-foreground">{sdg.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity Log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="floating-card p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Aktivitas Terakhir</h3>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </div>
          <ScrollArea className="h-48">
            <div className="space-y-2 pr-4">
              {activityLogs.slice(0, 10).map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-muted/50 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium">{log.action}</p>
                      <p className="text-muted-foreground text-xs">{log.result}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(new Date(log.timestamp), {
                        addSuffix: true,
                        locale: id,
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </motion.div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="floating-card p-4"
        >
          <h3 className="font-semibold mb-3">Milestone</h3>
          <div className="space-y-2">
            {[
              { target: 50, current: stats.devicesRecovered, label: 'Recovery 50 perangkat' },
              { target: 200, current: stats.componentsReused, label: 'Reuse 200 komponen' },
              { target: 500, current: stats.co2Saved, label: 'Simpan 500kg CO₂' },
            ].map((milestone) => {
              const progress = Math.min((milestone.current / milestone.target) * 100, 100);
              return (
                <div key={milestone.label} className="p-3 rounded-xl bg-muted/50">
                  <div className="flex justify-between text-sm mb-2">
                    <span>{milestone.label}</span>
                    <span className="text-muted-foreground">
                      {milestone.current}/{milestone.target}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-safe rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
