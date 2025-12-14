import { useState, useRef, useCallback, useEffect } from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { SafetyBadge } from '@/components/ui/SafetyBadge';
import { EmptyState } from '@/components/ui/EmptyState';
import { Camera, Upload, Play, Square, Volume2, Copy, Trash2, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useValoraToast } from '@/hooks/useToast';
import { Detection, ScanHistory } from '@/types/valora';
import { VALORA_COMPONENTS, getSafetyLevel, getSafetyNote } from '@/data/components';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useObjectDetection } from '@/hooks/useObjectDetection';
import { isElectronics, mapToEwaste } from '@/utils/ewasteMapping';
import { DetectionCanvas } from '@/components/scan/DetectionCanvas';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function ScanPage() {
  const [mode, setMode] = useState<'camera' | 'upload'>('camera');
  const [isStreaming, setIsStreaming] = useState(false);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [summary, setSummary] = useState<string>('');
  const [backendError, setBackendError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [scanHistory, setScanHistory] = useLocalStorage<ScanHistory[]>('valora-scan-history', []);
  const { toast } = useValoraToast();
  
  // Initialize object detection model
  const { detect, isLoading: modelLoading, error: modelError } = useObjectDetection();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsStreaming(true);
        startDetection();
      }
    } catch (error) {
      toast('Tidak dapat mengakses kamera', 'warning');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsStreaming(false);
  };

  const startDetection = () => {
    // Run client-side object detection continuously
    const runDetection = async () => {
      if (videoRef.current && videoRef.current.readyState === 4) {
        try {
          const predictions = await detect(videoRef.current);
          
          // Filter to only electronics and map to e-waste format
          const ewasteDetections: Detection[] = predictions
            .filter(p => isElectronics(p.class))
            .map(p => ({
              label: mapToEwaste(p.class) || p.class,
              confidence: p.score,
              bbox: p.bbox as [number, number, number, number],
            }));
          
          setDetections(ewasteDetections);
          setBackendError(false);
        } catch (error) {
          console.error('Detection error:', error);
        }
      }
      
      // Continue detection loop
      animationFrameRef.current = requestAnimationFrame(runDetection);
    };
    
    // Start detection loop
    runDetection();
    
    // Keep backend detection as optional fallback if API_URL is configured
    if (API_URL && API_URL !== 'http://localhost:8000') {
      intervalRef.current = setInterval(async () => {
        if (videoRef.current && canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            ctx.drawImage(videoRef.current, 0, 0);

            canvasRef.current.toBlob(
              async (blob) => {
                if (blob) {
                  await sendToBackend(blob);
                }
              },
              'image/jpeg',
              0.7
            );
          }
        }
      }, 2000);
    }
  };

  const sendToBackend = async (blob: Blob) => {
    try {
      const formData = new FormData();
      formData.append('file', blob, 'frame.jpg');

      const response = await fetch(`${API_URL}/detect`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Detection failed');

      const data = await response.json();
      setDetections(data.detections || []);
      setBackendError(false);
    } catch (error) {
      setBackendError(true);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast('Format file tidak didukung. Gunakan JPG/PNG.', 'warning');
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setIsProcessing(true);

    try {
      // Use client-side detection on uploaded image
      const img = new Image();
      img.src = imageUrl;
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const predictions = await detect(img);
      
      // Filter to only electronics and map to e-waste format
      const ewasteDetections: Detection[] = predictions
        .filter(p => isElectronics(p.class))
        .map(p => ({
          label: mapToEwaste(p.class) || p.class,
          confidence: p.score,
          bbox: p.bbox as [number, number, number, number],
        }));
      
      setDetections(ewasteDetections);
      setBackendError(false);
      
      // Try backend as fallback if configured
      if (API_URL && API_URL !== 'http://localhost:8000') {
        try {
          const formData = new FormData();
          formData.append('file', file);

          const response = await fetch(`${API_URL}/detect`, {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            // Merge backend results if they provide additional detections
            if (data.detections && data.detections.length > 0) {
              setDetections(prev => [...prev, ...data.detections]);
            }
          }
        } catch (backendError) {
          // Backend failed but client-side worked, so continue
          console.log('Backend detection failed, using client-side only');
        }
      }
    } catch (error) {
      setBackendError(true);
      toast('Gagal mendeteksi objek', 'warning');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleManualSelect = (label: string) => {
    const exists = detections.some((d) => d.label === label);
    if (exists) {
      setDetections(detections.filter((d) => d.label !== label));
    } else {
      setDetections([...detections, { label, confidence: 1.0, bbox: [0, 0, 0, 0] }]);
    }
  };

  const generateSummary = () => {
    const uniqueLabels = [...new Set(detections.map((d) => d.label))];
    const restrictedLabels = uniqueLabels.filter((l) => getSafetyLevel(l) === 'restricted');
    const safeOrCautionLabels = uniqueLabels.filter((l) => getSafetyLevel(l) !== 'restricted');

    const restrictedText = restrictedLabels.length > 0 ? restrictedLabels.join(', ') : 'Tidak ada';
    const recommendation =
      restrictedLabels.length > 0
        ? `bawa ${restrictedLabels.join(', ')} ke drop-off resmi, dan buka Panduan untuk ${safeOrCautionLabels.join(', ') || 'komponen lainnya'}.`
        : `buka Panduan untuk langkah recovery aman.`;

    const summaryText = `Terdeteksi ${uniqueLabels.length} objek: ${uniqueLabels.join(', ')}. Risiko tinggi: ${restrictedText}. Rekomendasi: ${recommendation}`;

    setSummary(summaryText);
    toast('Ringkasan siap dibacakan.', 'success');

    // Save to history
    const newHistory: ScanHistory = {
      id: Date.now().toString(),
      summary: summaryText,
      detections: uniqueLabels,
      timestamp: new Date().toISOString(),
    };
    setScanHistory([newHistory, ...scanHistory.slice(0, 9)]);
  };

  const speakSummary = () => {
    if (!summary) {
      toast('Buat ringkasan dulu ya.', 'warning');
      return;
    }
    const utterance = new SpeechSynthesisUtterance(summary);
    utterance.lang = 'id-ID';
    utterance.rate = 1.0;
    speechSynthesis.speak(utterance);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast('Tersalin!', 'success');
  };

  const deleteHistory = (id: string) => {
    setScanHistory(scanHistory.filter((h) => h.id !== id));
    toast('Riwayat dihapus', 'info');
  };

  const uniqueDetectedLabels = [...new Set(detections.map((d) => d.label))];

  return (
    <PageTransition>
      <div className="page-container pt-4 max-w-2xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Live Scan</h1>
        <p className="text-sm text-muted-foreground">
          Deteksi komponen e-waste dengan kamera atau upload foto.
        </p>

        {/* Mode Toggle */}
        <div className="flex gap-2">
          <Button
            variant={mode === 'camera' ? 'default' : 'outline'}
            onClick={() => setMode('camera')}
            className="flex-1"
          >
            <Camera className="w-4 h-4 mr-2" />
            Kamera
          </Button>
          <Button
            variant={mode === 'upload' ? 'default' : 'outline'}
            onClick={() => {
              setMode('upload');
              stopCamera();
            }}
            className="flex-1"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>

        {/* Model Loading Indicator */}
        {modelLoading && (
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
            <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-primary">Memuat model AI deteksi...</p>
              <p className="text-sm text-muted-foreground">
                Proses ini hanya terjadi sekali. Model akan di-cache di browser.
              </p>
            </div>
          </div>
        )}

        {/* Model Error Banner */}
        {modelError && (
          <div className="bg-caution-light border border-caution/20 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-caution flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-caution">Gagal memuat model AI</p>
              <p className="text-sm text-muted-foreground">
                Kamu masih bisa pilih manual atau coba refresh halaman.
              </p>
            </div>
          </div>
        )}

        {/* Backend Error Banner */}
        {backendError && !modelLoading && (
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-blue-600 dark:text-blue-400">Menggunakan deteksi AI lokal</p>
              <p className="text-sm text-muted-foreground">
                Deteksi berjalan sepenuhnya di browser Anda. Server backend tidak diperlukan.
              </p>
            </div>
          </div>
        )}

        {/* Camera/Upload Area */}
        <div className="floating-card overflow-hidden">
          {mode === 'camera' ? (
            <div className="relative aspect-[4/3] bg-muted">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={cn('w-full h-full object-cover', !isStreaming && 'hidden')}
              />
              <canvas ref={canvasRef} className="hidden" />
              
              {/* Detection Canvas Overlay */}
              <DetectionCanvas 
                videoRef={videoRef}
                detections={detections}
                isStreaming={isStreaming}
              />

              {!isStreaming && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button onClick={startCamera} size="lg" className="gap-2">
                    <Play className="w-5 h-5" />
                    Mulai Kamera
                  </Button>
                </div>
              )}

              {isStreaming && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <Button onClick={stopCamera} variant="destructive" size="sm" className="gap-2">
                    <Square className="w-4 h-4" />
                    Stop
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="relative aspect-[4/3] bg-muted">
              {uploadedImage ? (
                <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-contain" />
              ) : (
                <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                  <Upload className="w-12 h-12 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Klik untuk upload gambar</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              )}
              {isProcessing && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Detected Components */}
        <div className="floating-card p-4">
          <h3 className="font-semibold mb-3">Objek Terdeteksi</h3>
          {uniqueDetectedLabels.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {uniqueDetectedLabels.map((label) => (
                <motion.span
                  key={label}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  {label}
                </motion.span>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Camera}
              title="Belum ada objek terdeteksi"
              description="Coba arahkan kamera lebih dekat, pencahayaan lebih terang, atau gunakan Upload Foto."
              className="py-6"
            />
          )}
        </div>

        {/* Manual Selection */}
        <div className="floating-card p-4">
          <h3 className="font-semibold mb-3">Pilih Manual</h3>
          <ScrollArea className="h-32">
            <div className="flex flex-wrap gap-2 pr-4">
              {VALORA_COMPONENTS.map((comp) => {
                const isSelected = detections.some((d) => d.label === comp.label);
                return (
                  <button
                    key={comp.id}
                    onClick={() => handleManualSelect(comp.label)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-sm border transition-colors',
                      isSelected
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-muted border-border hover:border-primary/50'
                    )}
                  >
                    {comp.name}
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Safety Notes */}
        {uniqueDetectedLabels.length > 0 && (
          <div className="floating-card p-4 space-y-3">
            <h3 className="font-semibold">Catatan Keamanan</h3>
            {uniqueDetectedLabels.map((label) => {
              const level = getSafetyLevel(label);
              const note = getSafetyNote(label);
              return (
                <div key={label} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                  <SafetyBadge level={level} size="sm" showLabel={false} />
                  <div>
                    <p className="font-medium capitalize">{label}</p>
                    <p className="text-sm text-muted-foreground">{note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Actions */}
        {uniqueDetectedLabels.length > 0 && (
          <div className="flex gap-2">
            <Button onClick={generateSummary} className="flex-1 gap-2">
              <Sparkles className="w-4 h-4" />
              Ringkas
            </Button>
            <Button onClick={speakSummary} variant="outline" className="gap-2">
              <Volume2 className="w-4 h-4" />
              Bacakan
            </Button>
          </div>
        )}

        {/* Summary */}
        {summary && (
          <div className="floating-card p-4 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-primary mb-2">Ringkasan</h3>
                <p className="text-sm">{summary}</p>
              </div>
            </div>
          </div>
        )}

        {/* Scan History */}
        {scanHistory.length > 0 && (
          <div className="floating-card p-4">
            <h3 className="font-semibold mb-3">Riwayat Scan Terakhir</h3>
            <div className="space-y-2">
              {scanHistory.slice(0, 5).map((history) => (
                <div key={history.id} className="p-3 rounded-xl bg-muted/50 text-sm">
                  <p className="line-clamp-2">{history.summary}</p>
                  <div className="flex justify-end gap-2 mt-2">
                    <Button size="sm" variant="ghost" onClick={() => copyToClipboard(history.summary)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => deleteHistory(history.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
