import { toast as sonnerToast } from 'sonner';

type ToastType = 'success' | 'info' | 'warning';

export function useValoraToast() {
  const toast = (message: string, type: ToastType = 'info') => {
    const styles = {
      success: {
        style: {
          background: 'hsl(152, 60%, 42%)',
          color: 'white',
          border: 'none',
        },
      },
      info: {
        style: {
          background: 'hsl(174, 62%, 38%)',
          color: 'white',
          border: 'none',
        },
      },
      warning: {
        style: {
          background: 'hsl(0, 45%, 40%)',
          color: 'white',
          border: 'none',
        },
      },
    };

    sonnerToast(message, {
      duration: 2600,
      position: 'bottom-center',
      ...styles[type],
    });
  };

  return { toast };
}
