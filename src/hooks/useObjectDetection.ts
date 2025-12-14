import { useState, useEffect, useRef } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

/**
 * Custom hook for loading and using the COCO-SSD object detection model
 * The model is loaded once and cached by the browser (~5MB download)
 */
export function useObjectDetection() {
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const modelRef = useRef<cocoSsd.ObjectDetection | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadModel = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Load COCO-SSD model
        const loadedModel = await cocoSsd.load();
        
        if (isMounted) {
          modelRef.current = loadedModel;
          setModel(loadedModel);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          const error = err instanceof Error ? err : new Error('Failed to load model');
          setError(error);
          setIsLoading(false);
        }
      }
    };

    loadModel();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Detect objects in a video or image element
   * @param element - HTMLVideoElement or HTMLImageElement to analyze
   * @returns Array of detected objects with class, score, and bbox
   */
  const detect = async (element: HTMLVideoElement | HTMLImageElement) => {
    if (!modelRef.current || !element) {
      return [];
    }

    try {
      const predictions = await modelRef.current.detect(element);
      return predictions;
    } catch (err) {
      console.error('Detection error:', err);
      return [];
    }
  };

  return {
    model,
    detect,
    isLoading,
    error,
  };
}
