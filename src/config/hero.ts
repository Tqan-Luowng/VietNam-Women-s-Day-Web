export type DeviceMode = 'desktop' | 'mobile';

export interface HeroConfig {
  frameCount: number;
  heroVh: number;
  holdStart: number;
  holdEnd: number;
  bgFallback: string;
  initialRequiredFrames: number;
  windowSize: number;
  getFrameUrl: (mode: DeviceMode, index: number) => string;
}

export const HERO: HeroConfig = {
  frameCount: 100,          // 100 frames
  heroVh: 300,              // scroll length of the hero (300vh)
  holdStart: 0.04,          // progress where frames start moving
  holdEnd: 0.9,             // progress where the last frame is reached
  bgFallback: '#FFD6E0',    // soft warm rose pink
  initialRequiredFrames: 24,// wait for first 24 frames + last frame
  windowSize: 24,           // window of decoded ImageBitmaps around active frame
  getFrameUrl: (mode: DeviceMode, index: number) => {
    const padded = String(index).padStart(3, '0');
    return `/sequence/hero/${mode}/f_${padded}.webp`;
  },
};
