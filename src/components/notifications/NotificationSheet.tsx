import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useValoraToast } from '@/hooks/useToast';
import { Notification } from '@/types/valora';
import { MOCK_NOTIFICATIONS } from '@/data/mockData';
import { CheckCheck, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

interface NotificationSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotificationSheet({ open, onOpenChange }: NotificationSheetProps) {
  const [notifications, setNotifications] = useLocalStorage<Notification[]>(
    'valora-notifications',
    MOCK_NOTIFICATIONS
  );
  const { toast } = useValoraToast();

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast('Notifikasi diberesin ✅', 'success');
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-safe" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-restricted" />;
      default:
        return <Info className="w-4 h-4 text-caution" />;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
        <SheetHeader className="flex flex-row items-center justify-between pb-4">
          <SheetTitle>Notifikasi</SheetTitle>
          <Button variant="ghost" size="sm" onClick={markAllRead} className="text-primary">
            <CheckCheck className="w-4 h-4 mr-2" />
            Tandai semua dibaca
          </Button>
        </SheetHeader>

        <ScrollArea className="h-[calc(80vh-100px)]">
          <div className="space-y-2 pr-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  'p-4 rounded-xl border transition-colors',
                  notification.read
                    ? 'bg-muted/30 border-border/50'
                    : 'bg-card border-primary/20 shadow-sm'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{getIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className={cn('text-sm font-medium', !notification.read && 'text-foreground')}>
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">{notification.body}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatDistanceToNow(new Date(notification.timestamp), {
                        addSuffix: true,
                        locale: id,
                      })}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
