import { useEffect, useRef } from 'react';
import { Detection } from '@/types/valora';
import { isElectronics } from '@/utils/ewasteMapping';

interface DetectionCanvasProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  detections: Detection[];
  isStreaming: boolean;
}

/**
 * Canvas component that overlays on video to draw bounding boxes for detected objects
 * Color-codes electronics (green) vs other objects (gray)
 */
export function DetectionCanvas({ videoRef, detections, isStreaming }: DetectionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !videoRef.current || !isStreaming) {
      return;
    }

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Match canvas size to video
    const updateCanvasSize = () => {
      if (video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }
    };

    updateCanvasSize();

    // Animation frame for drawing
    let animationId: number;
    const draw = () => {
      if (!ctx || !canvas.width || !canvas.height) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw bounding boxes for each detection
      detections.forEach((detection) => {
        const [x, y, width, height] = detection.bbox;
        
        // Determine if this is electronics (use original class if available)
        const classToCheck = detection.originalClass || detection.label;
        const isElectronicsItem = isElectronics(classToCheck);
        
        // Set color: green for electronics, gray for others
        const color = isElectronicsItem ? '#22c55e' : '#9ca3af';
        const bgColor = isElectronicsItem ? 'rgba(34, 197, 94, 0.2)' : 'rgba(156, 163, 175, 0.2)';

        // Draw bounding box
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, width, height);

        // Draw filled background for label
        ctx.fillStyle = bgColor;
        ctx.fillRect(x, y, width, height);

        // Draw label background
        const label = `${detection.label} ${Math.round(detection.confidence * 100)}%`;
        ctx.font = 'bold 16px sans-serif';
        const textWidth = ctx.measureText(label).width;
        const textHeight = 20;
        
        ctx.fillStyle = color;
        ctx.fillRect(x, y - textHeight - 4, textWidth + 8, textHeight + 4);

        // Draw label text
        ctx.fillStyle = '#ffffff';
        ctx.fillText(label, x + 4, y - 8);
      });

      animationId = requestAnimationFrame(draw);
    };

    // Start drawing
    animationId = requestAnimationFrame(draw);

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [videoRef, detections, isStreaming]);

  if (!isStreaming) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 10 }}
    />
  );
}
