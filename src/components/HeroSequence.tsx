import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { HERO } from '../config/hero';
import { useFrameSequence } from '../hooks/useFrameSequence';
import { HeroOverlays } from './HeroOverlays';
import { Sparkles, Heart } from 'lucide-react';

interface HeroSequenceProps {
  onLoaded?: () => void;
  onScrollToNext?: () => void;
  mode?: 'static' | 'scroll';
}

export const HeroSequence: React.FC<HeroSequenceProps> = ({
  onLoaded,
  onScrollToNext,
  mode: scrollMode = 'scroll',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ambientCanvasRef = useRef<HTMLCanvasElement>(null);

  const {
    mode: deviceMode,
    isInitialReady,
    initialProgress,
    getFrame,
    onFrameRequested,
  } = useFrameSequence(true);

  const [hasReportedLoaded, setHasReportedLoaded] = useState(false);

  // Scroll mapping
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth physics spring for scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.0005,
  });

  const lastProgressRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Notify parent when initial frames are ready
  useEffect(() => {
    if (isInitialReady && !hasReportedLoaded) {
      setHasReportedLoaded(true);
      onLoaded?.();
    }
  }, [isInitialReady, hasReportedLoaded, onLoaded]);

  // Easing helper
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // Render function for scrubbing
  const renderFrameAt = useCallback((p: number) => {
    const canvas = canvasRef.current;
    const ambientCanvas = ambientCanvasRef.current;
    if (!canvas || !isInitialReady) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    const ambientCtx = ambientCanvas?.getContext('2d', { alpha: false });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Cap DPR at 1.5 on mobile to save GPU memory, 2 on desktop
    const dpr = Math.min(window.devicePixelRatio || 1, deviceMode === 'mobile' ? 1.5 : 2);
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    // Determine scroll direction for priority decoding
    const dir = p >= lastProgressRef.current ? 1 : -1;
    lastProgressRef.current = p;

    // Map progress to frame float
    const holdStart = HERO.holdStart;
    const holdEnd = HERO.holdEnd;
    const clampedProgress = Math.max(0, Math.min(1, (p - holdStart) / (holdEnd - holdStart)));
    const eased = easeInOutCubic(clampedProgress);
    const frameFloat = eased * (HERO.frameCount - 1);

    const fFloor = Math.floor(frameFloat);
    const fCeil = Math.min(HERO.frameCount - 1, fFloor + 1);
    const alpha = frameFloat - fFloor;

    // Request frames in scroll direction
    onFrameRequested(Math.round(frameFloat), dir);

    const frameBase = getFrame(fFloor) || getFrame(0);
    const frameNext = alpha > 0.02 ? getFrame(fCeil) : null;

    if (!frameBase) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // COVER fit
    const imgW = frameBase.width;
    const imgH = frameBase.height;
    const scale = Math.max(targetW / imgW, targetH / imgH);
    const renderW = imgW * scale;
    const renderH = imgH * scale;
    const dx = (targetW - renderW) / 2;
    const focalRatio = deviceMode === 'desktop' ? 0.5 : 0.40;
    const dy = -(renderH - targetH) * focalRatio;

    // Draw base frame
    ctx.globalAlpha = 1;
    ctx.drawImage(frameBase, dx, dy, renderW, renderH);

    // Sub-frame crossfade
    if (frameNext && alpha > 0.02) {
      ctx.globalAlpha = alpha;
      ctx.drawImage(frameNext, dx, dy, renderW, renderH);
      ctx.globalAlpha = 1;
    }

    // Ambient background blur for ultrawide desktop monitors (skip on mobile to preserve RAM)
    if (deviceMode === 'desktop' && ambientCanvas && ambientCtx) {
      const ambRect = ambientCanvas.getBoundingClientRect();
      const ambW = Math.round(ambRect.width * 0.35);
      const ambH = Math.round(ambRect.height * 0.35);

      if (ambientCanvas.width !== ambW || ambientCanvas.height !== ambH) {
        ambientCanvas.width = ambW;
        ambientCanvas.height = ambH;
      }

      const ambScale = Math.max(ambW / imgW, ambH / imgH);
      const ambRenderW = imgW * ambScale;
      const ambRenderH = imgH * ambScale;
      const ambDx = (ambW - ambRenderW) / 2;
      const ambDy = (ambH - ambRenderH) / 2;

      ambientCtx.imageSmoothingEnabled = true;
      ambientCtx.imageSmoothingQuality = 'low';
      ambientCtx.drawImage(frameBase, ambDx, ambDy, ambRenderW, ambRenderH);
    }
  }, [isInitialReady, deviceMode, getFrame, onFrameRequested]);

  // Scrub listener on smooth motion value
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    if (scrollMode === 'scroll') {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        renderFrameAt(latest);
      });
    }
  });

  // Initial draw & resize
  useEffect(() => {
    if (!isInitialReady) return;

    const drawCurrent = () => {
      const currentP = scrollMode === 'scroll' ? smoothProgress.get() : 0;
      renderFrameAt(currentP);
    };

    drawCurrent();

    const handleResize = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(drawCurrent);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isInitialReady, scrollMode, renderFrameAt, smoothProgress]);

  const percent = Math.min(100, Math.round(initialProgress * 100));

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none"
      style={{
        // 300vh scroll track to allow deep, responsive forward and reverse scrubbing
        height: scrollMode === 'scroll' ? `${HERO.heroVh}vh` : '100vh',
        backgroundColor: HERO.bgFallback,
      }}
    >
      {/* Sticky Stage Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Soft Ambient Blurred Background for Ultra-wide / Surrounding Viewports (Desktop only) */}
        {deviceMode === 'desktop' && (
          <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
            <canvas
              ref={ambientCanvasRef}
              className="w-full h-full object-cover filter blur-3xl scale-125 opacity-60 transition-opacity duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFD6E0]/40 via-transparent to-[#FFD6E0]/80" />
          </div>
        )}

        {/* Main Stage:
            - Desktop: Full widescreen 16:9 canvas (max-w-none w-full h-full)
            - Mobile: Centered vertical 9:16 stage (max-w-[480px] w-full h-full)
        */}
        <div
          className={`relative w-full h-full flex items-center justify-center overflow-hidden shadow-2xl transition-all duration-500 ${
            deviceMode === 'mobile' ? 'max-w-[480px]' : 'max-w-none'
          }`}
          style={{ backgroundColor: HERO.bgFallback }}
        >
          {/* Main 2D Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-full block transition-opacity duration-700 select-none"
            style={{ opacity: isInitialReady ? 1 : 0 }}
          />

          {/* Soft Edge Vignette / Gradient Mask on Stage */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(255,182,200,0.35)]" />

          {/* Bottom Gradient Handoff Mask fading into page background */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-cream via-cream/60 to-transparent pointer-events-none" />

          {/* DOM Overlays tied to scroll progress */}
          {isInitialReady && (
            <HeroOverlays
              progress={smoothProgress}
              mode={deviceMode}
              onOpenLetter={onScrollToNext}
            />
          )}
        </div>

        {/* Loader (Pink progress bar + spinner + Vietnamese copy) */}
        <AnimatePresence>
          {!isInitialReady && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#FFD6E0]/95 backdrop-blur-md text-plumText"
            >
              <div className="max-w-sm w-full bg-white/90 backdrop-blur-lg border border-pink-200/60 rounded-3xl p-7 shadow-2xl flex flex-col items-center text-center">
                <div className="relative mb-5 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-200 to-rose-300 flex items-center justify-center shadow-inner animate-pulse">
                    <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-bounce" />
                  </div>
                  <Sparkles className="w-6 h-6 text-amber-400 absolute -top-1 -right-1 animate-spin" style={{ animationDuration: '4s' }} />
                </div>

                <span className="text-[11px] uppercase tracking-widest font-bold text-accentPink bg-pink-100/80 px-3 py-1 rounded-full mb-2">
                  🌸 20 Tháng 10 - Ngày Phụ Nữ Việt Nam
                </span>

                <h3 className="font-handwriting text-2xl md:text-3xl font-bold text-plumText mb-6">
                  Đang Chuẩn Bị Điều Kỳ Diệu...
                </h3>

                {/* Pink Progress Bar */}
                <div className="w-full bg-pink-100 rounded-full h-3 p-0.5 overflow-hidden shadow-inner border border-pink-200/50 mb-3">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#FF9EAA] via-[#E8799A] to-[#D85A7E] shadow-sm"
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ ease: 'easeOut', duration: 0.2 }}
                  />
                </div>

                <div className="w-full flex justify-between items-center text-[11px] font-semibold text-plumText/70">
                  <span>Khởi tạo khung cảnh</span>
                  <span className="text-accentPink font-bold">{percent}%</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
