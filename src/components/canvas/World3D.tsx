import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { JOURNEY_CONFIG } from '../../config/journey';
import { signals } from '../../lib/signals';

interface World3DProps {
  onBoxClick?: () => void;
}

export const World3D: React.FC<World3DProps> = ({ onBoxClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- 1. SCENE & FOG ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfff5f7, 0.032);

    // --- 2. CAMERA ---
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(46, aspect, 0.1, 75);
    camera.position.set(0, 1.8, 4.5);
    camera.lookAt(0, 0.4, 0);

    // --- 3. RENDERER ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // --- 4. LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffeef2, 1.5);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaf0, 2.2);
    sunLight.position.set(6, 12, 8);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 40;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0xffb6c8, 1.2);
    rimLight.position.set(-6, 8, -6);
    scene.add(rimLight);

    // --- 5. CAMERA SPLINE PATH ---
    const camPoints = [
      new THREE.Vector3(...JOURNEY_CONFIG.chapters.hero.cameraPoint),
      new THREE.Vector3(...JOURNEY_CONFIG.chapters.generalLetter.cameraPoint),
      ...JOURNEY_CONFIG.chapters.stations.map((s) => new THREE.Vector3(...s.cameraPoint)),
      new THREE.Vector3(...JOURNEY_CONFIG.chapters.finale.cameraPoint),
    ];
    const camSpline = new THREE.CatmullRomCurve3(camPoints, false, 'catmullrom', 0.25);

    const lookPoints = [
      new THREE.Vector3(...JOURNEY_CONFIG.chapters.hero.lookAtPoint),
      new THREE.Vector3(...JOURNEY_CONFIG.chapters.generalLetter.lookAtPoint),
      ...JOURNEY_CONFIG.chapters.stations.map((s) => new THREE.Vector3(...s.lookAtPoint)),
      new THREE.Vector3(...JOURNEY_CONFIG.chapters.finale.lookAtPoint),
    ];
    const lookSpline = new THREE.CatmullRomCurve3(lookPoints, false, 'catmullrom', 0.25);

    // --- 6. SHARED MATERIALS ---
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf6c85f,
      roughness: 0.25,
      metalness: 0.4,
    });
    const softWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.35,
    });
    const darkFurMat = new THREE.MeshStandardMaterial({
      color: 0x3d2b27,
      roughness: 0.8,
    });

    // --- 7. HERO GIFT BOX ---
    const boxRoot = new THREE.Group();
    boxRoot.position.set(0, 0, 0);
    scene.add(boxRoot);

    const boxMat = new THREE.MeshStandardMaterial({
      color: 0xff8fa3,
      roughness: 0.3,
      metalness: 0.05,
    });
    const boxBaseGeo = new THREE.BoxGeometry(1.3, 0.9, 1.3);
    const boxBase = new THREE.Mesh(boxBaseGeo, boxMat);
    boxBase.position.y = 0.45;
    boxBase.castShadow = true;
    boxBase.receiveShadow = true;
    boxRoot.add(boxBase);

    // Ribbon crosses on base
    const ribBase1 = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.91, 0.22), goldMat);
    ribBase1.position.y = 0.45;
    boxRoot.add(ribBase1);
    const ribBase2 = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.91, 1.32), goldMat);
    ribBase2.position.y = 0.45;
    boxRoot.add(ribBase2);

    // Box Lid (Pivots at the back)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.9, -0.65);
    boxRoot.add(lidGroup);

    const lidMesh = new THREE.Mesh(new THREE.BoxGeometry(1.38, 0.22, 1.38), boxMat);
    lidMesh.position.set(0, 0.11, 0.65);
    lidMesh.castShadow = true;
    lidGroup.add(lidMesh);

    // Ribbon on lid
    const ribLid1 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.24, 0.24), goldMat);
    ribLid1.position.set(0, 0.11, 0.65);
    lidGroup.add(ribLid1);
    const ribLid2 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 1.4), goldMat);
    ribLid2.position.set(0, 0.11, 0.65);
    lidGroup.add(ribLid2);

    // Bow on top of lid
    const bowMesh1 = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.06, 12, 24), goldMat);
    bowMesh1.rotation.y = Math.PI / 4;
    bowMesh1.position.set(0, 0.3, 0.65);
    lidGroup.add(bowMesh1);
    const bowMesh2 = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.06, 12, 24), goldMat);
    bowMesh2.rotation.y = -Math.PI / 4;
    bowMesh2.position.set(0, 0.3, 0.65);
    lidGroup.add(bowMesh2);

    // Floating heart treasure emerging from box
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, 0.2);
    heartShape.bezierCurveTo(0, 0.35, 0.25, 0.5, 0.35, 0.35);
    heartShape.bezierCurveTo(0.45, 0.2, 0.3, 0, 0, -0.3);
    heartShape.bezierCurveTo(-0.3, 0, -0.45, 0.2, -0.35, 0.35);
    heartShape.bezierCurveTo(-0.25, 0.5, 0, 0.35, 0, 0.2);
    const heartGeo = new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.16,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    });
    const heartMat = new THREE.MeshStandardMaterial({
      color: 0xff3366,
      emissive: 0x661122,
      roughness: 0.2,
      metalness: 0.1,
    });
    const insideHeart = new THREE.Mesh(heartGeo, heartMat);
    insideHeart.scale.set(0.65, 0.65, 0.65);
    insideHeart.rotation.z = Math.PI;
    insideHeart.position.set(0, 0.5, 0);
    boxRoot.add(insideHeart);

    // --- 8. STATIONS 3D OBJECTS (Pedestals, Cute Teddy / Bunny, Balloons) ---
    const stationsGroup = new THREE.Group();
    scene.add(stationsGroup);

    // Helper: Build Cute 3D Teddy Bear
    const createTeddy = (accentHex: string) => {
      const bear = new THREE.Group();
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0xd4a373,
        roughness: 0.85,
      });
      const snoutMat = new THREE.MeshStandardMaterial({
        color: 0xfefae0,
        roughness: 0.85,
      });
      const accentMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(accentHex),
        roughness: 0.4,
      });

      // Body
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 16), bodyMat);
      body.position.y = 0.42;
      body.scale.set(1, 1.15, 0.95);
      bear.add(body);

      // Belly patch
      const belly = new THREE.Mesh(new THREE.SphereGeometry(0.24, 14, 14), snoutMat);
      belly.position.set(0, 0.44, 0.2);
      belly.scale.set(0.9, 1.1, 0.5);
      bear.add(belly);

      // Head
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 16), bodyMat);
      head.position.set(0, 0.88, 0.02);
      bear.add(head);

      // Snout
      const snout = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 14), snoutMat);
      snout.position.set(0, 0.82, 0.26);
      snout.scale.set(1.1, 0.8, 0.8);
      bear.add(snout);

      // Nose
      const nose = new THREE.Mesh(new THREE.SphereGeometry(0.04, 10, 10), darkFurMat);
      nose.position.set(0, 0.87, 0.35);
      bear.add(nose);

      // Eyes
      const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 10), darkFurMat);
      eyeL.position.set(-0.11, 0.92, 0.26);
      const eyeR = eyeL.clone();
      eyeR.position.x = 0.11;
      bear.add(eyeL, eyeR);

      // Ears
      const earL = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 12), bodyMat);
      earL.position.set(-0.25, 1.12, 0);
      const earR = earL.clone();
      earR.position.x = 0.25;
      bear.add(earL, earR);

      // Cute Little Bowtie
      const bow = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.035, 10, 16), accentMat);
      bow.position.set(0, 0.68, 0.3);
      bow.rotation.y = Math.PI / 4;
      bear.add(bow);

      // Arms holding a bouquet
      const armL = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.25, 8, 12), bodyMat);
      armL.position.set(-0.35, 0.48, 0.12);
      armL.rotation.z = -Math.PI / 6;
      armL.rotation.x = Math.PI / 6;
      const armR = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.25, 8, 12), bodyMat);
      armR.position.set(0.35, 0.48, 0.12);
      armR.rotation.z = Math.PI / 6;
      armR.rotation.x = Math.PI / 6;
      bear.add(armL, armR);

      return bear;
    };

    // Helper: Build Cute 3D Bunny
    const createBunny = (accentHex: string) => {
      const bunny = new THREE.Group();
      const whiteFur = new THREE.MeshStandardMaterial({
        color: 0xfdfdfd,
        roughness: 0.7,
      });
      const innerPink = new THREE.MeshStandardMaterial({
        color: 0xffb3c6,
        roughness: 0.6,
      });
      const accentMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(accentHex),
        roughness: 0.4,
      });

      // Body
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.36, 16, 16), whiteFur);
      body.position.y = 0.4;
      body.scale.set(0.95, 1.1, 0.95);
      bunny.add(body);

      // Head
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), whiteFur);
      head.position.set(0, 0.84, 0.02);
      bunny.add(head);

      // Long bunny ears
      const earL = new THREE.Mesh(new THREE.CapsuleGeometry(0.065, 0.38, 8, 14), whiteFur);
      earL.position.set(-0.14, 1.24, -0.02);
      earL.rotation.z = -0.15;
      earL.rotation.x = -0.1;
      const earInnerL = new THREE.Mesh(new THREE.CapsuleGeometry(0.04, 0.32, 6, 12), innerPink);
      earInnerL.position.set(-0.14, 1.24, 0.03);
      earInnerL.rotation.z = -0.15;

      const earR = new THREE.Mesh(new THREE.CapsuleGeometry(0.065, 0.38, 8, 14), whiteFur);
      earR.position.set(0.14, 1.24, -0.02);
      earR.rotation.z = 0.15;
      earR.rotation.x = -0.1;
      const earInnerR = new THREE.Mesh(new THREE.CapsuleGeometry(0.04, 0.32, 6, 12), innerPink);
      earInnerR.position.set(0.14, 1.24, 0.03);
      earInnerR.rotation.z = 0.15;
      bunny.add(earL, earInnerL, earR, earInnerR);

      // Eyes
      const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 10), darkFurMat);
      eyeL.position.set(-0.11, 0.86, 0.25);
      const eyeR = eyeL.clone();
      eyeR.position.x = 0.11;
      bunny.add(eyeL, eyeR);

      // Pink Nose
      const nose = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 10), innerPink);
      nose.position.set(0, 0.81, 0.29);
      bunny.add(nose);

      // Flower crown on head
      const flower = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.04, 8, 16), accentMat);
      flower.position.set(0.12, 1.05, 0.15);
      flower.rotation.x = Math.PI / 4;
      bunny.add(flower);

      return bunny;
    };

    // Instantiate Station Podiums and Characters
    const stationMascots: THREE.Group[] = [];

    JOURNEY_CONFIG.chapters.stations.forEach((st) => {
      const stationAnchor = new THREE.Group();
      stationAnchor.position.set(st.lookAtPoint[0], 0, st.lookAtPoint[2]);

      // Stepping Stone / Pedestal Base
      const pedestalGeo = new THREE.CylinderGeometry(1.2, 1.4, 0.35, 24);
      const pedestalMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(st.pedestalColor),
        roughness: 0.6,
      });
      const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
      pedestal.position.y = 0.17;
      pedestal.receiveShadow = true;
      stationAnchor.add(pedestal);

      // Floating Pastel Balloon attached to station
      const balloon = new THREE.Group();
      balloon.position.set(0.85, 1.7, -0.4);
      const balloonMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.32, 16, 16),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color(st.accentColor),
          roughness: 0.2,
          metalness: 0.1,
        })
      );
      balloonMesh.scale.set(1, 1.25, 1);
      balloon.add(balloonMesh);
      const stringGeo = new THREE.CylinderGeometry(0.005, 0.005, 1.2, 4);
      const stringMesh = new THREE.Mesh(stringGeo, softWhiteMat);
      stringMesh.position.y = -0.7;
      balloon.add(stringMesh);
      stationAnchor.add(balloon);

      // Character Mascot
      const mascot = st.animal === 'bear' ? createTeddy(st.accentColor) : createBunny(st.accentColor);
      mascot.position.set(0, 0.35, 0);
      // Face towards camera direction
      mascot.rotation.y = Math.atan2(
        st.cameraPoint[0] - st.lookAtPoint[0],
        st.cameraPoint[2] - st.lookAtPoint[2]
      );
      stationAnchor.add(mascot);
      stationMascots.push(mascot);

      stationsGroup.add(stationAnchor);
    });

    // --- 9. INSTANCED CHERRY BLOSSOM PETALS ---
    const petalCount = 120;
    const petalGeo = new THREE.ConeGeometry(0.08, 0.22, 5);
    petalGeo.scale(1, 0.3, 1.2);
    const petalMat = new THREE.MeshStandardMaterial({
      color: 0xffb6c8,
      roughness: 0.4,
      side: THREE.DoubleSide,
    });
    const instancedPetals = new THREE.InstancedMesh(petalGeo, petalMat, petalCount);
    scene.add(instancedPetals);

    const dummy = new THREE.Object3D();
    const petalData: {
      pos: THREE.Vector3;
      rot: THREE.Vector3;
      speed: number;
      sway: number;
    }[] = [];

    for (let i = 0; i < petalCount; i++) {
      const t = i / petalCount;
      const pt = camSpline.getPointAt(t);
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        Math.random() * 4 - 0.5,
        (Math.random() - 0.5) * 8
      );
      const pos = pt.clone().add(offset);
      const rot = new THREE.Vector3(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      petalData.push({
        pos,
        rot,
        speed: 0.006 + Math.random() * 0.008,
        sway: Math.random() * Math.PI * 2,
      });
    }

    // --- 10. FAIRY DUST PARTICLES ---
    const dustCount = 80;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const t = Math.random();
      const pt = camSpline.getPointAt(t);
      dustPos[i * 3] = pt.x + (Math.random() - 0.5) * 6;
      dustPos[i * 3 + 1] = pt.y + (Math.random() - 0.5) * 3;
      dustPos[i * 3 + 2] = pt.z + (Math.random() - 0.5) * 6;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xffdf88,
      size: 0.08,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    // --- 11. CLICK / INTERACTION DETECTION (GIFT BOX) ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([boxBase, lidMesh, insideHeart], true);
      if (intersects.length > 0 && onBoxClick) {
        onBoxClick();
      }
    };
    renderer.domElement.addEventListener('click', handlePointerDown);

    // --- 12. RENDER LOOP (DECOUPLED 60FPS HOT PATH) ---
    let reqId = 0;
    let smoothProgress = 0;
    let clock = new THREE.Clock();

    const currentCamPos = new THREE.Vector3(...JOURNEY_CONFIG.chapters.hero.cameraPoint);
    const currentLookPos = new THREE.Vector3(...JOURNEY_CONFIG.chapters.hero.lookAtPoint);
    const targetCamPos = new THREE.Vector3();
    const targetLookPos = new THREE.Vector3();

    const render = () => {
      reqId = requestAnimationFrame(render);
      const elapsedTime = clock.getElapsedTime();

      // Exponential damping towards signal progress
      const targetP = signals.scrollProgress;
      smoothProgress += (targetP - smoothProgress) * 0.075;
      const clampedP = Math.max(0, Math.min(1, smoothProgress));

      // 1. Camera Spline Follow
      camSpline.getPointAt(clampedP, targetCamPos);
      lookSpline.getPointAt(clampedP, targetLookPos);

      // Camera sway from mouse/subtle breathing
      targetCamPos.y += Math.sin(elapsedTime * 1.2) * 0.04;
      targetCamPos.x += Math.cos(elapsedTime * 0.8) * 0.03;

      currentCamPos.lerp(targetCamPos, 0.1);
      currentLookPos.lerp(targetLookPos, 0.1);

      camera.position.copy(currentCamPos);
      camera.lookAt(currentLookPos);

      // 2. Animate Hero Gift Box Lid
      const boxOpenRatio = Math.max(signals.boxOpenProgress, Math.min(1, clampedP * 5.5));
      lidGroup.rotation.x = THREE.MathUtils.lerp(lidGroup.rotation.x, -boxOpenRatio * 1.6, 0.1);
      insideHeart.position.y = THREE.MathUtils.lerp(
        insideHeart.position.y,
        0.5 + boxOpenRatio * 0.5,
        0.1
      );
      insideHeart.rotation.y = elapsedTime * 1.5;

      // 3. Animate Station Mascots (Gentle bobbing and breathing)
      stationMascots.forEach((mascot, idx) => {
        mascot.position.y = 0.35 + Math.sin(elapsedTime * 2 + idx) * 0.03;
      });

      // 4. Animate Floating Petals
      for (let i = 0; i < petalCount; i++) {
        const p = petalData[i];
        p.pos.y -= p.speed;
        p.pos.x += Math.sin(elapsedTime + p.sway) * 0.005;
        p.rot.x += 0.015;
        p.rot.y += 0.02;

        if (p.pos.y < -1) {
          p.pos.y = 4;
        }

        dummy.position.copy(p.pos);
        dummy.rotation.set(p.rot.x, p.rot.y, p.rot.z);
        dummy.updateMatrix();
        instancedPetals.setMatrixAt(i, dummy.matrix);
      }
      instancedPetals.instanceMatrix.needsUpdate = true;

      // 5. Animate Dust shimmer
      dustPoints.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    render();

    // --- 13. RESIZE LISTENER ---
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    };
    window.addEventListener('resize', handleResize);

    // CLEANUP
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handlePointerDown);
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
      petalGeo.dispose();
      petalMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      boxBaseGeo.dispose();
      heartGeo.dispose();
    };
  }, [onBoxClick]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full pointer-events-auto -z-10 overflow-hidden"
      style={{ touchAction: 'none' }}
    />
  );
};
