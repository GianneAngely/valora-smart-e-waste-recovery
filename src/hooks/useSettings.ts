import { useLocalStorage } from './useLocalStorage';
import { UserSettings } from '@/types/valora';

const DEFAULT_SETTINGS: UserSettings = {
  autoSpeakAfterSummary: false,
  fullAnimations: true,
  saveScanHistory: true,
  onboardingCompleted: false,
  voiceRate: 1.0,
};

export function useSettings() {
  const [settings, setSettings] = useLocalStorage<UserSettings>('valora-settings', DEFAULT_SETTINGS);

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const completeOnboarding = () => {
    updateSetting('onboardingCompleted', true);
  };

  return {
    settings,
    updateSetting,
    resetSettings,
    completeOnboarding,
  };
}
