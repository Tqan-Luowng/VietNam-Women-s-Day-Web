export interface StationConfig {
  id: string;
  name: string;
  callName: string;
  progressStart: number;
  progressFocus: number;
  progressExit: number;
  cameraPoint: [number, number, number];
  lookAtPoint: [number, number, number];
  animal: 'bear' | 'bunny' | 'bloomingLotus' | 'giftLantern';
  accentColor: string;
  pedestalColor: string;
}

export const JOURNEY_CONFIG = {
  totalScrollHeight: '650vh',
  scrubSmoothness: 1.4,
  backgroundVideo: {
    enabled: true,
    src: '/videos/background.mp4',
    opacity: 0.35, // Độ mờ phù hợp để không át cảnh 3D và chữ
  },
  chapters: {
    hero: {
      start: 0.0,
      focus: 0.04,
      end: 0.11,
      cameraPoint: [0, 1.8, 4.5] as [number, number, number],
      lookAtPoint: [0, 0.4, 0] as [number, number, number],
    },
    generalLetter: {
      start: 0.11,
      focus: 0.17,
      end: 0.23,
      cameraPoint: [1.8, 2.2, 3.2] as [number, number, number],
      lookAtPoint: [0.6, 0.8, -0.5] as [number, number, number],
    },
    stations: [
      {
        id: 'ba-ngoai',
        name: 'Bà Ngoại',
        callName: 'Bà Ngoại kính yêu',
        progressStart: 0.24,
        progressFocus: 0.29,
        progressExit: 0.35,
        cameraPoint: [-2.2, 1.8, 1.2] as [number, number, number],
        lookAtPoint: [-1.2, 0.5, -2.0] as [number, number, number],
        animal: 'bear',
        accentColor: '#D97706',
        pedestalColor: '#FEF3C7',
      },
      {
        id: 'ba',
        name: 'Bá',
        callName: 'Bá kính mến',
        progressStart: 0.36,
        progressFocus: 0.41,
        progressExit: 0.47,
        cameraPoint: [2.5, 2.0, -1.0] as [number, number, number],
        lookAtPoint: [1.4, 0.6, -3.5] as [number, number, number],
        animal: 'bunny',
        accentColor: '#DB2777',
        pedestalColor: '#FCE7F3',
      },
      {
        id: 'me-yeu',
        name: 'Mẹ',
        callName: 'Mẹ yêu thương',
        progressStart: 0.48,
        progressFocus: 0.53,
        progressExit: 0.59,
        cameraPoint: [-1.8, 2.3, -4.0] as [number, number, number],
        lookAtPoint: [-0.5, 0.8, -6.5] as [number, number, number],
        animal: 'bear',
        accentColor: '#E8799A',
        pedestalColor: '#FFE4E6',
      },
      {
        id: 'mo',
        name: 'Mợ',
        callName: 'Mợ chu đáo',
        progressStart: 0.60,
        progressFocus: 0.65,
        progressExit: 0.71,
        cameraPoint: [2.2, 2.1, -7.0] as [number, number, number],
        lookAtPoint: [0.8, 0.7, -9.5] as [number, number, number],
        animal: 'bunny',
        accentColor: '#8B5CF6',
        pedestalColor: '#EDE9FE',
      },
      {
        id: 'chi-hai',
        name: 'Chị Hai',
        callName: 'Chị Hai đảm đang',
        progressStart: 0.72,
        progressFocus: 0.77,
        progressExit: 0.83,
        cameraPoint: [-2.4, 2.2, -10.5] as [number, number, number],
        lookAtPoint: [-1.0, 0.8, -12.5] as [number, number, number],
        animal: 'bunny',
        accentColor: '#F472B6',
        pedestalColor: '#FDF2F8',
      },
      {
        id: 'em-gai',
        name: 'Bé Út',
        callName: 'Em Gái cưng',
        progressStart: 0.84,
        progressFocus: 0.89,
        progressExit: 0.94,
        cameraPoint: [1.8, 2.0, -13.5] as [number, number, number],
        lookAtPoint: [0.5, 0.7, -15.5] as [number, number, number],
        animal: 'bear',
        accentColor: '#F43F5E',
        pedestalColor: '#FFE4E6',
      },
    ] as StationConfig[],
    finale: {
      start: 0.94,
      focus: 0.97,
      end: 1.0,
      cameraPoint: [0, 2.8, -16.0] as [number, number, number],
      lookAtPoint: [0, 0.9, -19.0] as [number, number, number],
    },
  },
};
