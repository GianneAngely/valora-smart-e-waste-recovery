import { useEffect, useRef } from 'react';
import { Detection } from '@/types/valora';
import { getSafetyLevel } from '@/data/components';

interface DetectionOverlayProps {
  detections: Detection[];
  videoWidth: number;
  videoHeight: number;
}

const SAFETY_COLORS = {
  safe: '#22c55e',
  caution: '#f59e0b',
  restricted: '#ef4444',
};

export function DetectionOverlay({ detections, videoWidth, videoHeight }: DetectionOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each detection
    detections.forEach((detection) => {
      const [x, y, width, height] = detection.bbox;

      // Skip invalid bounding boxes (e.g., manual selections)
      if (x === 0 && y === 0 && width === 0 && height === 0) {
        return;
      }

      // Get safety level and corresponding color
      const safetyLevel = getSafetyLevel(detection.label);
      const color = SAFETY_COLORS[safetyLevel];

      // Draw bounding box
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, width, height);

      // Draw label background
      const label = `${detection.label} ${Math.round(detection.confidence * 100)}%`;
      ctx.font = '14px sans-serif';
      const textMetrics = ctx.measureText(label);
      const textWidth = textMetrics.width;
      const textHeight = 20;
      const padding = 4;

      ctx.fillStyle = color;
      ctx.fillRect(x, y - textHeight - padding, textWidth + padding * 2, textHeight + padding);

      // Draw label text
      ctx.fillStyle = '#ffffff';
      ctx.fillText(label, x + padding, y - padding - 4);
    });
  }, [detections, videoWidth, videoHeight]);

  return (
    <canvas
      ref={canvasRef}
      width={videoWidth}
      height={videoHeight}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
