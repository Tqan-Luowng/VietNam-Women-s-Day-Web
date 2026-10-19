import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  onOpenBox?: () => void;
  isOpen?: boolean;
  openProgress?: number; // 0 to 1 based on scroll
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  onOpenBox,
  isOpen = false,
  openProgress = 0,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(isOpen);
  const [hintVisible, setHintVisible] = useState(true);

  // References to animate
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const lidGroupRef = useRef<THREE.Group | null>(null);
  const boxGroupRef = useRef<THREE.Group | null>(null);
  const petalsMeshRef = useRef<THREE.InstancedMesh | null>(null);
  const progressRef = useRef(openProgress);
  progressRef.current = openProgress;

  const petalCount = 45;

  useEffect(() => {
    if (isOpen) setOpened(true);
  }, [isOpen]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    camera.position.set(0, 1.8, 4.5);
    camera.lookAt(0, 0.3, 0);

    // 3. Renderer with Three.js skill best practices
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xfff0f5, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(4, 6, 4);
    scene.add(dirLight);

    const softFill = new THREE.DirectionalLight(0xffb6c8, 1.0);
    softFill.position.set(-4, 3, -2);
    scene.add(softFill);

    // 5. 3D Gift Box Group
    const giftBoxGroup = new THREE.Group();
    boxGroupRef.current = giftBoxGroup;
    scene.add(giftBoxGroup);

    // Gift Materials (Pastel pink box with cream gold ribbon)
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0xffadc0,
      roughness: 0.35,
      metalness: 0.05,
    });
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0xffdf88,
      roughness: 0.25,
      metalness: 0.3,
    });
    const lidMat = new THREE.MeshStandardMaterial({
      color: 0xff8fa3,
      roughness: 0.3,
      metalness: 0.05,
    });

    // Box Base
    const baseGeo = new THREE.BoxGeometry(1.4, 1.0, 1.4);
    const baseMesh = new THREE.Mesh(baseGeo, boxMat);
    baseMesh.position.y = 0.5;
    giftBoxGroup.add(baseMesh);

    // Base Ribbons (vertical cross)
    const baseRibbonVGeo = new THREE.BoxGeometry(1.42, 1.02, 0.24);
    const baseRibbonVMesh = new THREE.Mesh(baseRibbonVGeo, ribbonMat);
    baseRibbonVMesh.position.y = 0.5;
    giftBoxGroup.add(baseRibbonVMesh);

    const baseRibbonHGeo = new THREE.BoxGeometry(0.24, 1.02, 1.42);
    const baseRibbonHMesh = new THREE.Mesh(baseRibbonHGeo, ribbonMat);
    baseRibbonHMesh.position.y = 0.5;
    giftBoxGroup.add(baseRibbonHMesh);

    // Lid Group (hinged for realistic open)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 1.02, 0);
    giftBoxGroup.add(lidGroup);
    lidGroupRef.current = lidGroup;

    const lidGeo = new THREE.BoxGeometry(1.5, 0.22, 1.5);
    const lidMesh = new THREE.Mesh(lidGeo, lidMat);
    lidMesh.position.y = 0.11;
    lidGroup.add(lidMesh);

    // Lid Ribbons
    const lidRibbon1 = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.24, 0.25), ribbonMat);
    lidRibbon1.position.y = 0.11;
    lidGroup.add(lidRibbon1);

    const lidRibbon2 = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.24, 1.52), ribbonMat);
    lidRibbon2.position.y = 0.11;
    lidGroup.add(lidRibbon2);

    // Bow on Top of Lid
    const bowGeo = new THREE.TorusGeometry(0.22, 0.07, 12, 24);
    const bowMesh1 = new THREE.Mesh(bowGeo, ribbonMat);
    bowMesh1.position.set(-0.16, 0.35, 0);
    bowMesh1.rotation.set(0, 0, Math.PI / 4);
    lidGroup.add(bowMesh1);

    const bowMesh2 = new THREE.Mesh(bowGeo, ribbonMat);
    bowMesh2.position.set(0.16, 0.35, 0);
    bowMesh2.rotation.set(0, 0, -Math.PI / 4);
    lidGroup.add(bowMesh2);

    const bowCenter = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), ribbonMat);
    bowCenter.position.set(0, 0.3, 0);
    lidGroup.add(bowCenter);

    // 6. Falling Petals (InstancedMesh for maximum 60fps performance)
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(0.08, 0.1, 0.12, 0.25, 0, 0.35);
    petalShape.bezierCurveTo(-0.12, 0.25, -0.08, 0.1, 0, 0);
    const petalGeo = new THREE.ShapeGeometry(petalShape);
    const petalMat = new THREE.MeshStandardMaterial({
      color: 0xffa8ba,
      side: THREE.DoubleSide,
      roughness: 0.5,
    });
    const petalsMesh = new THREE.InstancedMesh(petalGeo, petalMat, petalCount);
    petalsMeshRef.current = petalsMesh;
    scene.add(petalsMesh);

    // Setup petal physics data
    const dummy = new THREE.Object3D();
    const petalData = Array.from({ length: petalCount }).map(() => ({
      x: (Math.random() - 0.5) * 6,
      y: Math.random() * 5 + 1,
      z: (Math.random() - 0.5) * 4,
      rotX: Math.random() * Math.PI,
      rotY: Math.random() * Math.PI,
      rotZ: Math.random() * Math.PI,
      speedY: 0.008 + Math.random() * 0.012,
      speedRot: (Math.random() - 0.5) * 0.03,
      swayOffset: Math.random() * Math.PI * 2,
    }));

    // 7. Raycaster for clicking the box
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(giftBoxGroup.children, true);

      if (intersects.length > 0) {
        triggerOpen();
      }
    };

    window.addEventListener('click', handlePointerDown);

    // 8. Animation Loop
    const clock = new THREE.Clock();
    let animFrameId: number;
    let currentLidY = 1.02;
    let currentLidRotX = 0;
    let currentLidZ = 0;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const scrollRatio = Math.min(Math.max(progressRef.current, 0), 1);

      // Target position based on scroll or click-open
      const effectiveOpen = opened ? 1 : scrollRatio;

      const targetLidY = 1.02 + effectiveOpen * 1.5;
      const targetLidRotX = -effectiveOpen * 1.2;
      const targetLidZ = -effectiveOpen * 0.6;

      // Smooth interpolation (lerp)
      currentLidY += (targetLidY - currentLidY) * 0.1;
      currentLidRotX += (targetLidRotX - currentLidRotX) * 0.1;
      currentLidZ += (targetLidZ - currentLidZ) * 0.1;

      lidGroup.position.y = currentLidY;
      lidGroup.position.z = currentLidZ;
      lidGroup.rotation.x = currentLidRotX;

      // Gentle floating and rotation for gift box
      giftBoxGroup.rotation.y = Math.sin(elapsed * 0.7) * 0.15 + (effectiveOpen * 0.4);
      giftBoxGroup.position.y = Math.sin(elapsed * 2) * 0.04 - (effectiveOpen * 0.2);

      // Update Petals
      petalData.forEach((p, i) => {
        p.y -= p.speedY;
        p.rotX += p.speedRot;
        p.rotZ += p.speedRot * 0.8;
        p.x += Math.sin(elapsed * 1.5 + p.swayOffset) * 0.006;

        if (p.y < -1) {
          p.y = 5.5;
          p.x = (Math.random() - 0.5) * 6;
        }

        dummy.position.set(p.x, p.y, p.z);
        dummy.rotation.set(p.rotX, p.rotY, p.rotZ);
        dummy.scale.setScalar(0.7 + Math.sin(p.swayOffset) * 0.2);
        dummy.updateMatrix();
        petalsMesh.setMatrixAt(i, dummy.matrix);
      });
      petalsMesh.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handlePointerDown);
      renderer.dispose();
      baseGeo.dispose();
      lidGeo.dispose();
      bowGeo.dispose();
      petalGeo.dispose();
      boxMat.dispose();
      ribbonMat.dispose();
      lidMat.dispose();
      petalMat.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, [opened]);

  const triggerOpen = () => {
    if (opened) return;
    setOpened(true);
    setHintVisible(false);
    if (onOpenBox) onOpenBox();
  };

  return (
    <div className="relative w-full h-[360px] md:h-[450px] flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full cursor-pointer touch-none" />

      {/* Floating hint */}
      {hintVisible && !opened && openProgress < 0.2 && (
        <div
          onClick={triggerOpen}
          className="absolute bottom-2 bg-white/85 backdrop-blur-md px-5 py-2 rounded-full shadow-soft-pink border border-peachPink/40 text-plumText text-xs md:text-sm font-semibold flex items-center gap-2 cursor-pointer animate-bounce hover:scale-105 transition-transform"
        >
          <span>🎁</span>
          <span>Cuộn chuột xuống hoặc chạm để mở hộp quà!</span>
        </div>
      )}
    </div>
  );
};
