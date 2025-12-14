import { cn } from '@/lib/utils';
import { SafetyLevel } from '@/types/valora';
import { Shield, AlertTriangle, XCircle } from 'lucide-react';

interface SafetyBadgeProps {
  level: SafetyLevel;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const config = {
  safe: {
    label: 'Aman',
    icon: Shield,
    className: 'bg-safe-light text-safe border-safe/20',
  },
  caution: {
    label: 'Perlu Hati-hati',
    icon: AlertTriangle,
    className: 'bg-caution-light text-caution border-caution/20',
  },
  restricted: {
    label: 'Jangan Bongkar',
    icon: XCircle,
    className: 'bg-restricted-light text-restricted border-restricted/20',
  },
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export function SafetyBadge({ level, size = 'md', showLabel = true }: SafetyBadgeProps) {
  const { label, icon: Icon, className } = config[level];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        className,
        sizes[size]
      )}
    >
      <Icon className={cn(size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5')} />
      {showLabel && <span>{label}</span>}
    </span>
  );
}
