import { useState, useEffect, useRef, useCallback } from 'react';
import { HERO, type DeviceMode } from '../config/hero';

export interface UseFrameSequenceResult {
  mode: DeviceMode;
  isInitialReady: boolean;
  initialProgress: number; // 0..1 for critical frames
  totalProgress: number;   // 0..1 for all 100 frames
  loadedCount: number;
  totalCount: number;
  getFrame: (frameIndex: number) => ImageBitmap | HTMLImageElement | null;
  onFrameRequested: (frameIndex: number, direction?: number) => void;
}

function detectDeviceMode(): DeviceMode {
  if (typeof window === 'undefined') return 'mobile';
  // If viewport width >= 768 and aspect ratio is horizontal -> desktop (16:9 landscape)
  // Otherwise mobile (9:16 portrait)
  const isLandscape = window.innerWidth >= 768 && window.innerWidth > window.innerHeight;
  return isLandscape || window.innerWidth >= 768 ? 'desktop' : 'mobile';
}

export function useFrameSequence(enabled: boolean = true): UseFrameSequenceResult {
  const [mode, setMode] = useState<DeviceMode>(() => detectDeviceMode());
  const [isInitialReady, setIsInitialReady] = useState(false);
  const [initialProgress, setInitialProgress] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);

  // Listen to viewport resize to dynamically switch between mobile (9:16) and desktop (16:9)
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const nextMode = detectDeviceMode();
        setMode((prev) => (prev !== nextMode ? nextMode : prev));
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const frameCount = HERO.frameCount;
  const criticalCount = HERO.initialRequiredFrames + 1; // 24 + 1 = 25 frames (0..23 + 99)

  // In-memory storages
  const blobsRef = useRef<(Blob | null)[]>(new Array(frameCount).fill(null));
  const bitmapsRef = useRef<(ImageBitmap | null)[]>(new Array(frameCount).fill(null));
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(frameCount).fill(null));
  const loadedSetRef = useRef<Set<number>>(new Set());
  const activeFrameRef = useRef<number>(0);
  const lastDirectionRef = useRef<number>(1);
  const abortCtrlRef = useRef<AbortController | null>(null);

  // Manage sliding window of decoded ImageBitmaps around current active frame
  const maintainBitmapWindow = useCallback(async (centerIdx: number) => {
    if (typeof window === 'undefined' || !window.createImageBitmap) return;

    const halfWindow = Math.floor(HERO.windowSize / 2); // 12
    const minKeep = Math.max(0, centerIdx - halfWindow);
    const maxKeep = Math.min(frameCount - 1, centerIdx + halfWindow);

    // Evict bitmaps outside the window (keep 0 and frameCount - 1 for stable fallback)
    for (let i = 0; i < frameCount; i++) {
      if ((i < minKeep || i > maxKeep) && i !== 0 && i !== frameCount - 1) {
        if (bitmapsRef.current[i]) {
          try {
            bitmapsRef.current[i]!.close();
          } catch {
            // Already closed or detached
          }
          bitmapsRef.current[i] = null;
        }
      }
    }

    // Decode bitmaps inside the window if not already decoded
    const decodePromises: Promise<void>[] = [];
    for (let i = minKeep; i <= maxKeep; i++) {
      if (!bitmapsRef.current[i] && blobsRef.current[i]) {
        const idx = i;
        const blob = blobsRef.current[i]!;
        decodePromises.push(
          window.createImageBitmap(blob).then((bmp) => {
            bitmapsRef.current[idx] = bmp;
          }).catch(() => {
            // Decoding fallback handled gracefully
          })
        );
      }
    }

    if (decodePromises.length > 0) {
      await Promise.all(decodePromises);
    }
  }, [frameCount]);

  // Request frame retrieval and notify the hook of current position & direction
  const onFrameRequested = useCallback((frameIndex: number, direction: number = 1) => {
    const clamped = Math.max(0, Math.min(frameCount - 1, Math.round(frameIndex)));
    activeFrameRef.current = clamped;
    lastDirectionRef.current = direction >= 0 ? 1 : -1;
    maintainBitmapWindow(clamped);
  }, [frameCount, maintainBitmapWindow]);

  // Safe accessor: gets exact frame or nearest loaded frame
  const getFrame = useCallback((frameIndex: number): ImageBitmap | HTMLImageElement | null => {
    const target = Math.max(0, Math.min(frameCount - 1, Math.round(frameIndex)));

    // 1. Direct hit on decoded ImageBitmap
    if (bitmapsRef.current[target]) {
      return bitmapsRef.current[target];
    }
    // 2. Direct hit on fallback HTMLImageElement
    if (imagesRef.current[target]) {
      return imagesRef.current[target];
    }

    // 3. Fallback to nearest loaded frame
    let closestIdx = -1;
    let minDistance = Infinity;

    for (let i = 0; i < frameCount; i++) {
      if (bitmapsRef.current[i] || imagesRef.current[i]) {
        const dist = Math.abs(i - target);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = i;
        }
      }
    }

    if (closestIdx !== -1) {
      return bitmapsRef.current[closestIdx] || imagesRef.current[closestIdx] || null;
    }

    return null;
  }, [frameCount]);

  // Main loader effect (re-runs when mode switches between mobile and desktop)
  useEffect(() => {
    if (!enabled) return;

    // Reset state for new mode
    setIsInitialReady(false);
    setInitialProgress(0);
    setTotalProgress(0);
    setLoadedCount(0);
    loadedSetRef.current.clear();

    const abortController = new AbortController();
    abortCtrlRef.current = abortController;
    const { signal } = abortController;

    // Critical list: 0..23 and last frame 99
    const criticalIndices: number[] = [];
    for (let i = 0; i < HERO.initialRequiredFrames; i++) {
      criticalIndices.push(i);
    }
    if (!criticalIndices.includes(frameCount - 1)) {
      criticalIndices.push(frameCount - 1);
    }

    let loadedCriticalCount = 0;

    const loadSingleFrame = async (idx: number): Promise<boolean> => {
      if (loadedSetRef.current.has(idx)) return true;

      const url = HERO.getFrameUrl(mode, idx);
      try {
        const res = await fetch(url, { signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const blob = await res.blob();
        blobsRef.current[idx] = blob;

        if (window.createImageBitmap) {
          try {
            const bmp = await window.createImageBitmap(blob);
            bitmapsRef.current[idx] = bmp;
          } catch {
            const img = new Image();
            img.src = URL.createObjectURL(blob);
            await img.decode();
            imagesRef.current[idx] = img;
          }
        } else {
          const img = new Image();
          img.src = URL.createObjectURL(blob);
          await img.decode();
          imagesRef.current[idx] = img;
        }

        loadedSetRef.current.add(idx);
        const curCount = loadedSetRef.current.size;
        setLoadedCount(curCount);
        setTotalProgress(curCount / frameCount);

        if (criticalIndices.includes(idx)) {
          loadedCriticalCount++;
          setInitialProgress(loadedCriticalCount / criticalCount);
          if (loadedCriticalCount >= criticalCount) {
            setIsInitialReady(true);
          }
        }
        return true;
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.warn(`[HeroSequence] Failed to load frame ${idx}:`, err);
        }
        return false;
      }
    };

    // Stage 1: Load critical frames concurrently in batches of 6
    const loadCriticalFrames = async () => {
      const concurrency = 6;
      for (let i = 0; i < criticalIndices.length; i += concurrency) {
        if (signal.aborted) break;
        const batch = criticalIndices.slice(i, i + concurrency);
        await Promise.all(batch.map((idx) => loadSingleFrame(idx)));
      }
      setIsInitialReady(true);
      setInitialProgress(1);

      // Stage 2: Background loader for remaining frames (priority based on scroll)
      loadRemainingFrames();
    };

    const loadRemainingFrames = async () => {
      const remaining: number[] = [];
      for (let i = 0; i < frameCount; i++) {
        if (!criticalIndices.includes(i)) {
          remaining.push(i);
        }
      }

      while (remaining.length > 0 && !signal.aborted) {
        const cur = activeFrameRef.current;
        const dir = lastDirectionRef.current;

        remaining.sort((a, b) => {
          const distA = Math.abs(a - cur);
          const distB = Math.abs(b - cur);
          const isForwardA = (a - cur) * dir >= 0 ? 0 : 1;
          const isForwardB = (b - cur) * dir >= 0 ? 0 : 1;
          if (isForwardA !== isForwardB) return isForwardA - isForwardB;
          return distA - distB;
        });

        const nextBatch = remaining.splice(0, 4);
        await Promise.all(nextBatch.map((idx) => loadSingleFrame(idx)));

        maintainBitmapWindow(activeFrameRef.current);
      }
    };

    loadCriticalFrames();

    return () => {
      abortController.abort();
      for (let i = 0; i < frameCount; i++) {
        if (bitmapsRef.current[i]) {
          try {
            bitmapsRef.current[i]!.close();
          } catch {
            // Already closed
          }
          bitmapsRef.current[i] = null;
        }
        if (imagesRef.current[i] && imagesRef.current[i]!.src.startsWith('blob:')) {
          URL.revokeObjectURL(imagesRef.current[i]!.src);
          imagesRef.current[i] = null;
        }
        blobsRef.current[i] = null;
      }
    };
  }, [enabled, mode, frameCount, criticalCount, maintainBitmapWindow]);

  return {
    mode,
    isInitialReady,
    initialProgress,
    totalProgress,
    loadedCount,
    totalCount: frameCount,
    getFrame,
    onFrameRequested,
  };
}
