# Phân Tích Kiến Trúc Scroll-Driven 3D & Kế Hoạch Áp Dụng Cho Website 20/10

Tài liệu này đúc kết các kỹ thuật cốt lõi từ 2 repository mẫu:
1. **`HxnDev/Portfolio`**: Cơ chế `scroll` → `mutable ref` → `useFrame` điều khiển camera & vật thể 3D.
2. **`abbujani/Doomsday`**: Kiến trúc `Signal Bus` singleton + 1 Master GSAP Timeline/ScrollTrigger điều khiển toàn bộ giá trị frame-by-frame.
3. **Synthesis Architecture**: Thiết kế kiến trúc tối ưu cho Hành trình 3D cuộn chuột ngày 20/10.

---

## I. Mổ Xẻ Kiến Trúc Hai Repository Mẫu

### 1. `HxnDev/Portfolio` (Mô hình Local Mutable Ref + Act Switcher)

```
[ Window Scroll / Lenis ]
         │
         ▼
[ ScrollTrigger on pinned Stage ]
         │
         ├───► onUpdate: progress.current = self.progress  (Mutable Ref - 0 Re-render)
         │
         └───► onUpdate: if (idx !== lastIdx) setActive(idx)  (React State - Chỉ re-render khi đổi Act)
                     │
                     ├───► <CinematicScene progress={progress} /> (Three.js Canvas)
                     │          └─► useFrame(() => read progress.current, lerp/damp transforms)
                     │
                     └───► <DOM Acts /> (Text / Buttons tương ứng với Act hiện tại)
```

* **Cách tổ chức Files**:
  - `src/components/home/CinematicStage.jsx`: Container giữ chiều cao cuộn (pinned section), khởi tạo một `ScrollTrigger` duy nhất, quản lý mốc `ACT_STARTS = [0, 0.22, 0.42, 0.64, 0.83]`.
  - `src/components/three/CinematicScene.jsx`: Cảnh 3D R3F Canvas. Nhận prop `progress` (chính là `useRef(0)`).
  - `src/components/core/SmoothScroll.jsx`: Khởi tạo Lenis làm mượt quán tính cuộn chuột.
* **Cách truyền tiến độ cuộn**:
  - `ScrollTrigger` cập nhật giá trị trực tiếp vào biến tham chiếu `progress.current = self.progress`.
  - Bên trong `useFrame((state, delta) => { ... })`, component 3D đọc trực tiếp `progress.current` và dùng hàm suy giảm hàm mũ `damp(cur, target, lambda, delta)` để nội suy mượt mà vị trí camera, độ méo vật thể, tỷ lệ thu phóng.
* **Cách triệt tiêu Re-render**:
  - Trong suốt quá trình cuộn 60fps bên trong một chương (Act), hoàn toàn **không gọi `setState`**.
  - `setState(idx)` chỉ được gọi đúng 1 lần khi người dùng vượt qua ranh giới giữa 2 Act (ví dụ từ Act 0 sang Act 1). DOM text chỉ re-render tại khoảnh khắc chuyển màn.

---

### 2. `abbujani/Doomsday` (Mô hình Global Signal Bus + Master Scrubbed Timeline)

```
[ Lenis Smooth Scroll ] ──► gsap.ticker sync ──► [ Master ScrollTrigger ]
                                                           │
                                                           ▼
                                                [ GSAP Master Timeline ]
                                                           │
                                                           ▼ (Tweens write per-frame)
                                          ┌─────────────────────────────────┐
                                          │  signals (Plain Singleton Bus)  │
                                          │  • signals.scrollProgress       │
                                          │  • signals.cameraDolly          │
                                          │  • signals.stationFade          │
                                          │  • signals.portalOpen           │
                                          └─────────────────────────────────┘
                                                           │
                                       ┌───────────────────┴───────────────────┐
                                       ▼                                       ▼
                       [ <CameraRig /> in useFrame ]           [ <SceneDriver /> in useFrame ]
                       • Đọc signals.scrollProgress            • Cập nhật Shader Uniforms
                       • Cập nhật Camera Spline & Shake        • Biến đổi hình học & Hạt
```

* **Cách tổ chức Files**:
  - `lib/signals.ts`: Khởi tạo một đối tượng JavaScript thuần (Plain Mutable Singleton):
    ```typescript
    export interface Signals {
      time: number;
      scroll: number;
      dolly: number;
      portal: number;
      energy: number;
      // ...
    }
    export const signals: Signals = { time: 0, scroll: 0, ... };
    ```
  - `lib/useLenis.ts`: Cấu hình Lenis với GSAP:
    ```typescript
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    ```
  - `components/Experience.tsx`: Khởi tạo Master Timeline được scrub theo cuộn chuột. Timeline này tween trực tiếp các thuộc tính của object `signals`.
  - `components/webgl/CameraRig.tsx` & `SceneDriver.tsx`: Nằm bên trong `<Canvas>`, `useFrame` đọc liên tục từ `signals` để lái góc nhìn, vị trí camera và hiệu ứng mà không phụ thuộc React state.
* **Cách triệt tiêu Re-render**:
  - Hot path (đường truyền 60fps) tách rời 100% khỏi cơ chế điều phối của React Virtual DOM.
  - Mọi biến đổi liên tục (tọa độ chuột, quán tính cuộn, độ rung, độ mở) đều truyền qua memory reference của `signals`.

---

## II. Đề Xuất Kiến Trúc Cho Hành Trình 3D Cuộn Chuột Ngày 20/10

Kết hợp ưu điểm của cả hai mô hình trên để đạt độ mượt tối đa (60fps trên mobile), code sạch và dễ thêm/bớt trạm:

### 1. Cấu hình tập trung (`src/config/journey.ts`)
Tất cả các mốc trạm, vị trí camera, dữ liệu người nhận được quy về một nguồn sự thật (Single Source of Truth). Khi muốn thêm/bớt một người, chỉ cần khai báo thêm 1 trạm:

```typescript
export interface StationConfig {
  id: string;
  name: string;
  callName: string;
  progressStart: number;  // Bắt đầu vào trạm (ví dụ: 0.25)
  progressFocus: number;  // Điểm camera dừng lại chính diện (ví dụ: 0.30)
  progressExit: number;   // Điểm camera bắt đầu rời trạm (ví dụ: 0.35)
  cameraPoint: [number, number, number]; // Tọa độ camera trên Spline
  lookAtPoint: [number, number, number]; // Tọa độ gấu bông / bảng tên
  animal: 'bear' | 'bunny';
  accentColor: string;
}

export const JOURNEY_CONFIG = {
  totalScrollHeight: '700vh', // Độ dài vùng cuộn tổng
  scrubSmoothness: 1.2,       // Độ mượt khi cuộn
  chapters: {
    gate: { start: 0, end: 0.08 },
    giftIntro: { start: 0.08, focus: 0.16, end: 0.22 },
    generalLetter: { start: 0.22, focus: 0.28, end: 0.34 },
    stations: [
      { id: 'ba-ngoai', progressStart: 0.36, progressFocus: 0.44, progressExit: 0.48, ... },
      { id: 'ba',       progressStart: 0.50, progressFocus: 0.56, progressExit: 0.60, ... },
      { id: 'me-yeu',   progressStart: 0.62, progressFocus: 0.68, progressExit: 0.72, ... },
      { id: 'mo',       progressStart: 0.74, progressFocus: 0.80, progressExit: 0.84, ... },
      { id: 'chi-hai',  progressStart: 0.85, progressFocus: 0.90, progressExit: 0.93, ... },
    ],
    finale: { start: 0.94, end: 1.0 }
  }
};
```

---

### 2. Luồng tín hiệu & Quản lý Re-render

1. **Signal Bus (`src/lib/signals.ts`)**:
   - Lưu trữ `scrollProgress` (0 → 1), `currentStationIndex`, `boxOpenProgress`, `cameraPosition`, `cameraLookAt`.
2. **Scroll Bridge (`src/components/scroll/ScrollRig.tsx`)**:
   - Sử dụng Lenis + GSAP ScrollTrigger duy nhất gắn trên container `#journey-track`.
   - Mỗi frame cuộn chỉ gán: `signals.scrollProgress = self.progress;`.
   - Sử dụng một callback so sánh ngưỡng `getStationFromProgress(p)`: chỉ khi index trạm thay đổi thì mới gọi `setCurrentStation(index)` của React để DOM hiển thị đúng Card polaroid.
3. **World 3D (`src/components/canvas/World3D.tsx`)**:
   - Một Canvas Three.js cố định duy nhất (`fixed inset-0 pointer-events-none`).
   - Component `CameraPathSpline`:
     - Khởi tạo `THREE.CatmullRomCurve3` đi uốn lượn mềm mại qua khu vườn màu hồng và các trạm.
     - Trong `useFrame`: `curve.getPointAt(signals.scrollProgress, targetCamPos)`. Lerp camera position và camera lookAt tới điểm quan sát của trạm hiện tại.
   - Component `InstancedPetals`: Cánh hoa và hạt bụi tiên (fairy dust) trôi nhẹ, phản ứng nhẹ theo tốc độ cuộn.
   - Component `AnimalHost`: Mô hình chú gấu / thỏ con cute cầm bảng tên đặt tại vị trí của từng người trong 3D space.

---

### 3. Tầng giao diện DOM (`src/components/dom/OverlayLayer.tsx`)

- **Card hiển thị**: Khi camera tiến vào vùng `progressFocus` của một trạm, Card polaroid (tích hợp `FlipCard` React Bits) xuất hiện ở vị trí trang trọng giữa màn hình với hiệu ứng spring và chữ gõ dần.
- **Khóa cuộn khi chơi Minigame**:
  - Khi người xem bấm nút "Chơi câu hỏi vui": gọi `lenis.stop()` để khóa cuộn trang, tránh trường hợp người dùng lỡ tay cuộn làm bay mất card.
  - Khi hoàn thành minigame và nhận Huy hiệu: gọi `lenis.start()` để mở khóa và cho phép tiếp tục hành trình.
- **Mini-Map Navigation**:
  - Một thanh điều hướng mini thanh mảnh nằm dọc cạnh màn hình với avatar của từng người.
  - Khi bấm vào avatar ai, gọi `lenis.scrollTo(stationOffset)` để camera tự động lướt trên đường cong 3D bay thẳng tới trạm của người đó!

---

### 4. Hiệu Năng & Fallback Toàn Diện

- **Giới hạn DPR**: `gl={{ powerPreference: 'high-performance' }}`, `dpr={[1, Math.min(window.devicePixelRatio, 1.75)]}`.
- **Instancing**: Cánh hoa và hoa dại mặt đất sử dụng `InstancedMesh` (chỉ 1 draw call cho hàng trăm cánh hoa).
- **Phát hiện thiết bị yếu / Fallback 2D**:
  - Kiểm tra `prefers-reduced-motion` hoặc khả năng hỗ trợ WebGL. Nếu thiết bị không đáp ứng, tự động chuyển sang chế độ 2D card truyền thống (dùng chung 100% tệp `JOURNEY_CONFIG` và `mockData.ts`).

---

Tài liệu đã được ghi nhận vào `docs/patterns.md`. Bạn hãy duyệt qua phương án kiến trúc này để chúng ta tiến hành từng bước triển khai nhé!
