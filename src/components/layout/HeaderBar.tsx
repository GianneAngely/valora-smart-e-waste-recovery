import { Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NotificationSheet } from "@/components/notifications/NotificationSheet";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Notification } from "@/types/valora";
import { MOCK_NOTIFICATIONS } from "@/data/mockData";

export function HeaderBar() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useLocalStorage<Notification[]>(
    "valora-notifications",
    MOCK_NOTIFICATIONS,
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1">
              <img
                src="/valora logo aja.svg"
                alt="VALORA Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              VALORA
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setShowNotifications(true)}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <NotificationSheet
        open={showNotifications}
        onOpenChange={setShowNotifications}
      />
    </>
  );
}
