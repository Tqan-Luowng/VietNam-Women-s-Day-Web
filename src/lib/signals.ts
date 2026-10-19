export interface JourneySignals {
  scrollProgress: number;
  targetScroll: number;
  currentStationIndex: number;
  boxOpenProgress: number;
  activeChapter: 'hero' | 'generalLetter' | 'station' | 'finale';
  activeStationId: string | null;
  isLocked: boolean; // For minigames or modals
}

export const signals: JourneySignals = {
  scrollProgress: 0,
  targetScroll: 0,
  currentStationIndex: -1,
  boxOpenProgress: 0,
  activeChapter: 'hero',
  activeStationId: null,
  isLocked: false,
};

type Listener = (signals: JourneySignals) => void;
const listeners = new Set<Listener>();

export const subscribeSignals = (fn: Listener): (() => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export const notifySignals = () => {
  listeners.forEach((fn) => fn(signals));
};
