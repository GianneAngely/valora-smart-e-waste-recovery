import { NavLink, useLocation } from 'react-router-dom';
import { Home, ScanLine, BookOpen, ShoppingBag, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const tabs = [
  { path: '/', icon: Home, label: 'Beranda' },
  { path: '/scan', icon: ScanLine, label: 'Scan' },
  { path: '/guide', icon: BookOpen, label: 'Panduan' },
  { path: '/market', icon: ShoppingBag, label: 'Pasar' },
  { path: '/dashboard', icon: BarChart3, label: 'Dampak' },
];

export function BottomTabs() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50">
      <div className="glass-strong rounded-2xl shadow-lg px-2 py-2 max-w-md mx-auto">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            const Icon = tab.icon;

            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className="relative flex flex-col items-center px-3 py-2 rounded-xl transition-all duration-200"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <Icon
                    className={cn(
                      'w-5 h-5 transition-colors duration-200',
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    )}
                  />
                </motion.div>
                <span
                  className={cn(
                    'text-xs mt-1 font-medium transition-colors duration-200',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {tab.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
