import { Outlet } from 'react-router-dom';
import { HeaderBar } from './HeaderBar';
import { BottomTabs } from './BottomTabs';
import { Toaster } from 'sonner';

export function AppShell() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <HeaderBar />
      <main className="flex-1 pb-24">
        <Outlet />
      </main>
      <BottomTabs />
      <Toaster
        position="bottom-center"
        offset={100}
        toastOptions={{
          className: 'rounded-xl shadow-lg',
        }}
      />
    </div>
  );
}
