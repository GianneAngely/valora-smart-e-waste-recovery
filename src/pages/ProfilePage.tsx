import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, Settings, Volume2, Sparkles, History, RotateCcw, HelpCircle, Info, ChevronRight, LogOut } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { useValoraToast } from '@/hooks/useToast';
import { motion } from 'framer-motion';

const FAQ_ITEMS = [
  {
    q: 'Apa itu VALORA?',
    a: 'VALORA adalah platform green tech untuk recovery komponen e-waste secara aman dan bertanggung jawab.',
  },
  {
    q: 'Bagaimana cara menggunakan Live Scan?',
    a: 'Aktifkan kamera atau upload foto, sistem akan mendeteksi komponen e-waste dan memberikan panduan keamanan.',
  },
  {
    q: 'Apa bedanya Aman, Perlu Hati-hati, dan Jangan Bongkar?',
    a: 'Aman = boleh dibongkar sendiri. Perlu Hati-hati = perlu ketelitian extra. Jangan Bongkar = serahkan ke drop-off resmi.',
  },
  {
    q: 'Di mana saya bisa menyerahkan komponen berbahaya?',
    a: 'Lihat daftar drop-off center di halaman Keamanan atau gunakan fitur pencarian lokasi.',
  },
  {
    q: 'Apakah data saya aman?',
    a: 'Data disimpan lokal di perangkatmu. Kami tidak mengumpulkan data pribadi.',
  },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { settings, updateSetting, resetSettings } = useSettings();
  const { toast } = useValoraToast();
  const [showFAQ, setShowFAQ] = useState(false);

  const handleReset = () => {
    localStorage.clear();
    resetSettings();
    toast('Data demo direset.', 'info');
    navigate('/');
    window.location.reload();
  };

  return (
    <PageTransition>
      <div className="page-container pt-4 max-w-2xl mx-auto space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="floating-card p-6 text-center"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold">Kamu</h2>
          <p className="text-sm text-muted-foreground">Bikin e-waste lebih bernilai.</p>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="floating-card p-4 space-y-4"
        >
          <div className="flex items-center gap-3 pb-2 border-b border-border">
            <Settings className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-semibold">Pengaturan</h3>
          </div>

          {/* Auto Speak */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm">Auto-bacakan setelah ringkas</p>
                <p className="text-xs text-muted-foreground">Otomatis bacakan hasil scan</p>
              </div>
            </div>
            <Switch
              checked={settings.autoSpeakAfterSummary}
              onCheckedChange={(v) => updateSetting('autoSpeakAfterSummary', v)}
            />
          </div>

          {/* Full Animations */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm">Animasi penuh</p>
                <p className="text-xs text-muted-foreground">Tampilan lebih hidup</p>
              </div>
            </div>
            <Switch
              checked={settings.fullAnimations}
              onCheckedChange={(v) => updateSetting('fullAnimations', v)}
            />
          </div>

          {/* Save History */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <History className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm">Simpan riwayat scan</p>
                <p className="text-xs text-muted-foreground">Rekam hasil scan terakhir</p>
              </div>
            </div>
            <Switch
              checked={settings.saveScanHistory}
              onCheckedChange={(v) => updateSetting('saveScanHistory', v)}
            />
          </div>

          {/* Voice Rate */}
          <div className="py-2">
            <div className="flex items-center gap-3 mb-3">
              <Volume2 className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm">Kecepatan suara</p>
                <p className="text-xs text-muted-foreground">Atur kecepatan pembacaan</p>
              </div>
            </div>
            <Slider
              value={[settings.voiceRate]}
              onValueChange={(v) => updateSetting('voiceRate', v[0])}
              min={0.9}
              max={1.1}
              step={0.05}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Lambat</span>
              <span>{settings.voiceRate.toFixed(2)}x</span>
              <span>Cepat</span>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <button
            onClick={() => setShowFAQ(true)}
            className="w-full floating-card p-4 flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">Lihat FAQ</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button
            onClick={() => navigate('/about')}
            className="w-full floating-card p-4 flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">Tentang VALORA</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button
            onClick={() => navigate('/safety')}
            className="w-full floating-card p-4 flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">Drop-off Centers</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </motion.div>

        {/* Reset */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="outline"
            onClick={handleReset}
            className="w-full gap-2 border-destructive/50 text-destructive hover:bg-destructive/10"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Data Demo
          </Button>
        </motion.div>

        {/* FAQ Modal */}
        <Dialog open={showFAQ} onOpenChange={setShowFAQ}>
          <DialogContent className="max-w-md max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>FAQ</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="space-y-4">
                {FAQ_ITEMS.map((item, index) => (
                  <div key={index} className="p-4 rounded-xl bg-muted/50">
                    <p className="font-medium mb-2">{item.q}</p>
                    <p className="text-sm text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}
