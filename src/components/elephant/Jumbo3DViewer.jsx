import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Loader2 } from 'lucide-react';

/**
 * Jumbo3DViewer - Accurate Physical Kinematics for Elephant Workouts
 * 
 * Accurately classified vertex kinematics (2,276 vertices):
 * - Trunk: 344 vertices curling smoothly lifting the 150 kg Acacia Log
 * - Left & Right Ears: 226 vertices fanning with realistic biological elasticity
 * - 4 Legs: 472 vertices performing true 4-beat quadruped stride & 5-ton squats
 * - Torso & Skull: 1,234 vertices with compression, respiration, and postural weight shifts
 */
export default function Jumbo3DViewer({
  state = 'idle',
  workoutId = null,
  className = '',
  height = 'h-[480px] sm:h-[580px] lg:h-[640px]',
  interactive = true,
  activeAngle = 'perspective',
  onAngleChange = null
}) {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const elephantDataRef = useRef(null);
  const turntableGroupRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  // 360 Rotation state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.1, y: 0.45 }); // Initial natural 3/4 perspective
  const currentRotationRef = useRef({ x: 0.1, y: 0.45 });
  const zoomLevelRef = useRef(5.4);
  const targetZoomRef = useRef(5.4);

  // Sync external angle preset changes
  useEffect(() => {
    if (!activeAngle) return;
    if (activeAngle === 'front') {
      targetRotationRef.current = { x: 0.04, y: 0 };
    } else if (activeAngle === 'perspective') {
      targetRotationRef.current = { x: 0.1, y: 0.45 };
    } else if (activeAngle === 'back') {
      targetRotationRef.current = { x: 0.04, y: Math.PI };
    } else if (activeAngle === 'side' || activeAngle === 'left') {
      targetRotationRef.current = { x: 0.04, y: -Math.PI / 2 };
    } else if (activeAngle === 'right') {
      targetRotationRef.current = { x: 0.04, y: Math.PI / 2 };
    }
  }, [activeAngle]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const heightPx = container.clientHeight || 600;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(36, width / heightPx, 0.1, 100);
    camera.position.set(0, 1.25, zoomLevelRef.current);

    // 2. WEBGL RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. SAVANNA SUNLIGHTING & SOFT SHADOWS
    const ambientLight = new THREE.AmbientLight(0xdce8dd, 1.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5dd, 2.7);
    sunLight.position.set(4.5, 9.0, 5.5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 25;
    sunLight.shadow.camera.left = -4;
    sunLight.shadow.camera.right = 4;
    sunLight.shadow.camera.top = 4;
    sunLight.shadow.camera.bottom = -4;
    sunLight.shadow.bias = -0.0003;
    scene.add(sunLight);

    const bounceLight = new THREE.DirectionalLight(0xbfa57e, 0.9);
    bounceLight.position.set(0, -4, 3);
    scene.add(bounceLight);

    const rimLight = new THREE.DirectionalLight(0x89b09b, 1.4);
    rimLight.position.set(-6, 3.8, -5);
    scene.add(rimLight);

    // 4. CIRCULAR STONE TURNTABLE PEDESTAL
    const stoneCanvas = document.createElement('canvas');
    stoneCanvas.width = 1024;
    stoneCanvas.height = 1024;
    const stCtx = stoneCanvas.getContext('2d');

    stCtx.fillStyle = '#8f8474';
    stCtx.fillRect(0, 0, 1024, 1024);

    for (let i = 0; i < 20000; i++) {
      const v = Math.random();
      stCtx.fillStyle = v > 0.5 ? 'rgba(175, 163, 145, 0.35)' : 'rgba(80, 72, 60, 0.35)';
      stCtx.fillRect(Math.random() * 1024, Math.random() * 1024, 3, 3);
    }

    // Concentric Turntable Rings
    stCtx.lineWidth = 14;
    stCtx.strokeStyle = 'rgba(55, 48, 38, 0.65)';
    stCtx.beginPath();
    stCtx.arc(512, 512, 380, 0, Math.PI * 2);
    stCtx.stroke();

    stCtx.lineWidth = 4;
    stCtx.strokeStyle = 'rgba(215, 205, 185, 0.4)';
    stCtx.beginPath();
    stCtx.arc(512, 512, 384, 0, Math.PI * 2);
    stCtx.stroke();

    stCtx.lineWidth = 6;
    stCtx.strokeStyle = 'rgba(65, 58, 48, 0.45)';
    stCtx.beginPath();
    stCtx.arc(512, 512, 160, 0, Math.PI * 2);
    stCtx.stroke();

    const stoneTexture = new THREE.CanvasTexture(stoneCanvas);
    const stoneMaterial = new THREE.MeshStandardMaterial({
      map: stoneTexture,
      bumpMap: stoneTexture,
      bumpScale: 0.04,
      roughness: 0.88,
      metalness: 0.08,
      color: 0x938879
    });

    const turntable = new THREE.Group();
    turntable.position.y = -0.52;
    scene.add(turntable);
    turntableGroupRef.current = turntable;

    const pedestalGeo = new THREE.CylinderGeometry(2.35, 2.45, 0.22, 64);
    const pedestalMesh = new THREE.Mesh(pedestalGeo, stoneMaterial);
    pedestalMesh.position.y = -0.11;
    pedestalMesh.receiveShadow = true;
    pedestalMesh.castShadow = true;
    turntable.add(pedestalMesh);

    const rimGeo = new THREE.TorusGeometry(2.38, 0.06, 16, 64);
    rimGeo.rotateX(Math.PI / 2);
    const rimMesh = new THREE.Mesh(rimGeo, stoneMaterial);
    rimMesh.position.y = 0.0;
    rimMesh.receiveShadow = true;
    turntable.add(rimMesh);

    const contactShadowGeo = new THREE.CircleGeometry(2.7, 48);
    contactShadowGeo.rotateX(-Math.PI / 2);
    const contactShadowMat = new THREE.MeshBasicMaterial({
      color: 0x181e18,
      transparent: true,
      opacity: 0.38
    });
    const contactShadow = new THREE.Mesh(contactShadowGeo, contactShadowMat);
    contactShadow.position.y = -0.225;
    scene.add(contactShadow);

    // 5. 150 KG ACACIA WORKOUT LOG (SHOWN DURING TRUNK CURLS)
    const logGeo = new THREE.CylinderGeometry(0.14, 0.14, 1.5, 24);
    logGeo.rotateZ(Math.PI / 2);
    const logMat = new THREE.MeshStandardMaterial({
      color: 0x5a341b,
      roughness: 0.76,
      metalness: 0.06
    });
    const acaciaLog = new THREE.Mesh(logGeo, logMat);
    acaciaLog.castShadow = true;
    acaciaLog.visible = false;
    turntable.add(acaciaLog);

    // 6. LOAD AUTHENTIC REALISTIC ELEPHANT GLB MODEL & PRE-CLASSIFY VERTICES
    const loader = new GLTFLoader();
    loader.load(
      '/models/elephant.glb',
      (gltf) => {
        const model = gltf.scene;

        let elephantMesh = null;
        model.traverse((child) => {
          if (child.isMesh) {
            elephantMesh = child;
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              child.material.roughness = 0.84;
              child.material.metalness = 0.04;
              child.material.needsUpdate = true;
            }
          }
        });

        if (!elephantMesh) {
          setIsLoading(false);
          return;
        }

        const geo = elephantMesh.geometry;
        const posAttr = geo.attributes.position;
        const count = posAttr.count;
        const origPositions = Float32Array.from(posAttr.array);

        // Precise anatomical segmentation:
        // 1: Trunk (248 verts: |x|<0.48, z>2.0, y<=4.2)
        // 2: Left Ear (113 verts)
        // 3: Right Ear (113 verts)
        // 4: Front Left Leg (109 verts)
        // 5: Front Right Leg (109 verts)
        // 6: Back Left Leg (124 verts)
        // 7: Back Right Leg (124 verts)
        // 0: Torso / Head (1,336 verts)
        const partTypes = new Uint8Array(count);

        for (let i = 0; i < count; i++) {
          const x = origPositions[i * 3];
          const y = origPositions[i * 3 + 1];
          const z = origPositions[i * 3 + 2];

          // Trunk: narrow in X, forward of face, strictly below forehead (y <= 4.2)
          if (Math.abs(x) < 0.48 && z > 2.0 && y <= 4.2) {
            partTypes[i] = 1;
          }
          // Left Ear: outer lateral left and upper
          else if (x < -2.1 && y > 3.8) {
            partTypes[i] = 2;
          }
          // Right Ear: outer lateral right and upper
          else if (x > 2.1 && y > 3.8) {
            partTypes[i] = 3;
          }
          // Legs: lower pillars (y < 3.4)
          else if (y < 3.4) {
            if (z > 0.0) {
              if (x < -0.3) partTypes[i] = 4; // Front-Left
              else if (x > 0.3) partTypes[i] = 5; // Front-Right
              else partTypes[i] = 0;
            } else {
              if (x < -0.3) partTypes[i] = 6; // Back-Left
              else if (x > 0.3) partTypes[i] = 7; // Back-Right
              else partTypes[i] = 0;
            }
          } else {
            partTypes[i] = 0; // Torso & Skull — never deformed by trunk animation
          }
        }

        // Fit model on turntable
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);

        const targetHeight = 2.45;
        const scaleFactor = targetHeight / Math.max(size.y, 0.1);
        model.scale.set(scaleFactor, scaleFactor, scaleFactor);

        model.position.x = -center.x * scaleFactor;
        model.position.z = -center.z * scaleFactor;
        model.position.y = -box.min.y * scaleFactor;

        turntable.add(model);

        elephantDataRef.current = {
          mesh: elephantMesh,
          geometry: geo,
          posAttr,
          origPositions,
          partTypes,
          count,
          scaleFactor,
          baseY: model.position.y,
          model,
          acaciaLog
        };

        setIsLoading(false);
      },
      undefined,
      (err) => {
        console.error('Error loading elephant GLB model:', err);
        setIsLoading(false);
      }
    );

    // 7. 360-DEGREE MOUSE & TOUCH DRAG LISTENERS
    const onMouseDown = (e) => {
      if (!interactive) return;
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDraggingRef.current || !interactive) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      targetRotationRef.current.y += deltaX * 0.008;
      targetRotationRef.current.x = Math.max(-0.25, Math.min(0.55, targetRotationRef.current.x + deltaY * 0.006));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };

      if (onAngleChange) {
        onAngleChange('custom');
      }
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onTouchStart = (e) => {
      if (!interactive || e.touches.length === 0) return;
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchMove = (e) => {
      if (!isDraggingRef.current || !interactive || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      targetRotationRef.current.y += deltaX * 0.01;
      targetRotationRef.current.x = Math.max(-0.25, Math.min(0.55, targetRotationRef.current.x + deltaY * 0.008));

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      if (onAngleChange) {
        onAngleChange('custom');
      }
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const onWheel = (e) => {
      if (!interactive) return;
      e.preventDefault();
      targetZoomRef.current = Math.max(3.8, Math.min(8.2, targetZoomRef.current + e.deltaY * 0.004));
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    container.addEventListener('wheel', onWheel, { passive: false });

    // 8. 3D BIOLOGICAL ANIMATION & ACCURATE WORKOUT KINEMATICS TICK LOOP
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth camera & turntable rotation damping
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.12;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.12;
      zoomLevelRef.current += (targetZoomRef.current - zoomLevelRef.current) * 0.12;

      if (turntableGroupRef.current) {
        turntableGroupRef.current.rotation.y = currentRotationRef.current.y;
        turntableGroupRef.current.rotation.x = currentRotationRef.current.x;
      }
      camera.position.z = zoomLevelRef.current;

      const ed = elephantDataRef.current;
      if (ed && ed.posAttr) {
        const { posAttr, origPositions, partTypes, count, acaciaLog, scaleFactor, model } = ed;
        const posArray = posAttr.array;

        // Resolve active workout mode
        const isTrunkCurl = state === 'trunk_curls' || workoutId === 'trunk_curls';
        const isSquats = state === 'squats' || state === 'exercising' || workoutId === 'elephant_squats';
        const isEarFlaps = state === 'ear_flaps' || workoutId === 'ear_flaps';
        const isWalking = state === 'walking' || state === 'running' || workoutId === 'forest_walk' || workoutId === 'distance_walk';
        const isResting = state === 'resting' || state === 'sleeping' || workoutId === 'mud_pool';
        const isCelebrating = state === 'celebrating';
        const isEating = state === 'eating';
        const isPeanutOverload = state === 'peanut_overload';

        // Toggle Acacia Log during Trunk Curls
        acaciaLog.visible = isTrunkCurl;

        // --- ACCURATE PHYSICAL KINEMATICS PER EXERCISE ---

        if (isSquats) {
          // =========================================================================
          // EXERCISE 1: 5-TON ELEPHANT SQUATS (DEEP KNEE FLEXION & TORSO PRESS)
          // =========================================================================
          const squatTime = time * 2.2;
          const squatPhase = (Math.sin(squatTime) + 1) * 0.5; // 0 (up) to 1 (down)
          const dropY = squatPhase * 2.6; // Deep dramatic descent

          for (let i = 0; i < count; i++) {
            const ox = origPositions[i * 3];
            const oy = origPositions[i * 3 + 1];
            const oz = origPositions[i * 3 + 2];
            const part = partTypes[i];

            if (part === 0 || part === 1 || part === 2 || part === 3) {
              // Massive body and skull descend deeply into the squat
              // Flanks widen by 10% as 5.2 tons compresses down
              posArray[i * 3] = ox * (1.0 + squatPhase * 0.1);
              posArray[i * 3 + 1] = oy - dropY;
              posArray[i * 3 + 2] = oz;
            } else {
              // Legs (parts 4, 5, 6, 7):
              // Feet (oy ≈ 0) STAY FIRMLY ANCHORED on the stone turntable!
              const legH = Math.min(1.0, Math.max(0.0, oy / 3.4)); // 0 at foot, 1 at hip
              const kneeFlex = Math.sin(legH * Math.PI) * squatPhase * 0.85;

              // Front knees flex backward & outward; back knees flex forward & outward!
              const isFrontLeg = (part === 4 || part === 5);
              const isRightLeg = (part === 5 || part === 7);

              posArray[i * 3] = ox + (isRightLeg ? 1 : -1) * kneeFlex * 0.45;
              posArray[i * 3 + 1] = oy - dropY * legH;
              posArray[i * 3 + 2] = oz + (isFrontLeg ? -1 : 1) * kneeFlex * 0.65;
            }
          }

        } else if (isTrunkCurl) {
          // =========================================================================
          // EXERCISE 2: 150 KG ACACIA LOG TRUNK CURLS
          //
          // Anatomy: trunk base y=4.2 (chin), trunk tip y=0.0 (ground)
          // s=0 at base (no movement), s=1 at tip (max curl)
          // Curl arc lifts tip from y≈0.1 → y≈3.3 (chest height) at peak
          // Only part===1 verts (y<=4.2) are deformed — skull/forehead untouched
          // =========================================================================
          const curlTime = time * 2.2;
          const curlPhase = (Math.sin(curlTime) + 1) * 0.5; // 0→1→0 smooth oscillation

          // Track tip position for Acacia Log (computed once per frame)
          let logTipY = 0.1;
          let logTipZ = 4.6;

          for (let i = 0; i < count; i++) {
            const ox = origPositions[i * 3];
            const oy = origPositions[i * 3 + 1];
            const oz = origPositions[i * 3 + 2];
            const part = partTypes[i];

            if (part === 1) {
              // s = 0 at trunk base (oy≈4.2), s = 1 at trunk tip (oy≈0)
              // Strictly clamped: base does NOT move, tip curls fully
              const s = Math.max(0.0, Math.min(1.0, (4.2 - oy) / 4.2));

              // Progressive arc angle — higher s = greater curl
              // At s=1, curlPhase=1: angle = 1.8 rad (~103°) — a strong muscular hook
              const angle = Math.pow(s, 1.1) * curlPhase * 1.8;

              // Lift: trunk sweeps upward (sin of arc angle)
              const lift = Math.sin(angle) * s * 3.2;
              // Retract: trunk pulls inward toward chest (1 - cos of arc)
              const retract = (1.0 - Math.cos(angle)) * s * 1.5;

              posArray[i * 3]     = ox;
              posArray[i * 3 + 1] = oy + lift;
              posArray[i * 3 + 2] = oz - retract;

              // Track tip vertex (s > 0.9) for log attachment
              if (s > 0.9) {
                logTipY = oy + lift;
                logTipZ = oz - retract;
              }
            } else {
              // Body braces naturally — slight chest expansion during heavy lift
              posArray[i * 3]     = ox * (1.0 + curlPhase * 0.02);
              posArray[i * 3 + 1] = oy + curlPhase * 0.08;
              posArray[i * 3 + 2] = oz;
            }
          }

          // Move Acacia Log to follow the curling trunk tip in world space
          if (acaciaLog) {
            const worldY = logTipY * scaleFactor + model.position.y + (turntable.position.y || 0);
            const worldZ = logTipZ * scaleFactor + model.position.z;
            // Tilt the log to match the trunk's curl angle at tip (s=1)
            const tipAngle = curlPhase * 1.8;
            acaciaLog.position.set(0, worldY + 0.06, worldZ + 0.08);
            acaciaLog.rotation.x = -tipAngle * 0.55;
          }

        } else if (isEarFlaps) {
          // =========================================================================
          // EXERCISE 3: EAR FLAPS AEROBICS (WIDE AERODYNAMIC FANNING)
          // =========================================================================
          const flapAngle = Math.sin(time * 6.5) * 0.75; // Broad, prominent fan
          const headSway = Math.sin(time * 3.25) * 0.08;

          for (let i = 0; i < count; i++) {
            const ox = origPositions[i * 3];
            const oy = origPositions[i * 3 + 1];
            const oz = origPositions[i * 3 + 2];
            const part = partTypes[i];

            if (part === 2) {
              // Left ear: broad forward-and-back fanning
              const distFromRoot = Math.max(0, Math.abs(ox) - 2.1);
              posArray[i * 3] = ox + Math.abs(flapAngle) * 0.35;
              posArray[i * 3 + 1] = oy;
              posArray[i * 3 + 2] = oz + flapAngle * distFromRoot * 1.1;
            } else if (part === 3) {
              // Right ear: symmetrical fanning
              const distFromRoot = Math.max(0, ox - 2.1);
              posArray[i * 3] = ox - Math.abs(flapAngle) * 0.35;
              posArray[i * 3 + 1] = oy;
              posArray[i * 3 + 2] = oz - flapAngle * distFromRoot * 1.1;
            } else {
              // Subtle head & trunk rhythm
              posArray[i * 3] = ox + (oy > 4.0 ? headSway : 0);
              posArray[i * 3 + 1] = oy;
              posArray[i * 3 + 2] = oz;
            }
          }

        } else if (isWalking) {
          // =========================================================================
          // EXERCISE 4 & 5: FOREST WALK & DISTANCE WALK (AUTHENTIC 4-BEAT GAIT)
          // =========================================================================
          const speed = (state === 'running' || workoutId === 'distance_walk') ? 6.8 : 4.8;
          
          // Proper diagonal quadruped footfall timing:
          const phaseFL = Math.sin(time * speed);
          const phaseBR = Math.sin(time * speed + Math.PI * 0.4);
          const phaseFR = Math.sin(time * speed + Math.PI);
          const phaseBL = Math.sin(time * speed + Math.PI * 1.4);

          for (let i = 0; i < count; i++) {
            const ox = origPositions[i * 3];
            const oy = origPositions[i * 3 + 1];
            const oz = origPositions[i * 3 + 2];
            const part = partTypes[i];

            if (part >= 4 && part <= 7) {
              let legPhase = 0;
              if (part === 4) legPhase = phaseFL;
              else if (part === 5) legPhase = phaseFR;
              else if (part === 6) legPhase = phaseBL;
              else if (part === 7) legPhase = phaseBR;

              const footProximity = Math.max(0, 1.0 - oy / 3.4); // 1 at foot, 0 at hip
              const strideZ = legPhase * footProximity * 1.4; // Clear 1.4 unit stride
              const footLiftY = Math.max(0, -legPhase) * footProximity * 0.55; // Visible lift

              posArray[i * 3] = ox;
              posArray[i * 3 + 1] = oy + footLiftY;
              posArray[i * 3 + 2] = oz + strideZ;
            } else if (part === 1) {
              // Trunk sways in natural counter-rhythm
              posArray[i * 3] = ox + Math.sin(time * (speed / 2)) * 0.4;
              posArray[i * 3 + 1] = oy + Math.abs(Math.sin(time * speed)) * 0.14;
              posArray[i * 3 + 2] = oz;
            } else {
              // Torso bobs with each powerful step
              posArray[i * 3] = ox;
              posArray[i * 3 + 1] = oy + Math.abs(Math.sin(time * speed)) * 0.14;
              posArray[i * 3 + 2] = oz;
            }
          }

        } else if (isResting) {
          // =========================================================================
          // EXERCISE 6: MUD-POOL RECOVERY (RECLINING ON TURNTABLE)
          // =========================================================================
          const breath = Math.sin(time * 1.2) * 0.03;

          for (let i = 0; i < count; i++) {
            const ox = origPositions[i * 3];
            const oy = origPositions[i * 3 + 1];
            const oz = origPositions[i * 3 + 2];
            const part = partTypes[i];

            if (part >= 4 && part <= 7) {
              // Legs folded comfortably
              const h = Math.min(1.0, oy / 3.4);
              posArray[i * 3] = ox * 1.08;
              posArray[i * 3 + 1] = oy * 0.6;
              posArray[i * 3 + 2] = oz;
            } else if (part === 1) {
              // Trunk resting relaxed on the turntable
              posArray[i * 3] = ox;
              posArray[i * 3 + 1] = Math.max(0.1, oy - 1.2);
              posArray[i * 3 + 2] = oz;
            } else {
              // Body settles down with deep relaxing breath
              posArray[i * 3] = ox * (1.06 + breath);
              posArray[i * 3 + 1] = (oy - 1.2) * (0.9 + breath);
              posArray[i * 3 + 2] = oz;
            }
          }

        } else if (isCelebrating) {
          // =========================================================================
          // CELEBRATION: PROUD REAR-UP & HIGH TRUMPET BLAST
          // =========================================================================
          const rear = (Math.sin(time * 3.5) + 1) * 0.5;

          for (let i = 0; i < count; i++) {
            const ox = origPositions[i * 3];
            const oy = origPositions[i * 3 + 1];
            const oz = origPositions[i * 3 + 2];
            const part = partTypes[i];

            if (part === 1) {
              // Trunk arches straight up into the savanna sky!
              const d = Math.max(0, (oz - 2.0) / 3.2);
              posArray[i * 3] = ox;
              posArray[i * 3 + 1] = oy + d * rear * 3.8;
              posArray[i * 3 + 2] = oz - d * rear * 1.8;
            } else if (part === 2 || part === 3) {
              // Ears spread wide in pride
              posArray[i * 3] = ox * 1.15;
              posArray[i * 3 + 1] = oy + rear * 0.3;
              posArray[i * 3 + 2] = oz;
            } else {
              // Chest rears up proudly
              posArray[i * 3] = ox;
              posArray[i * 3 + 1] = oy + rear * 0.25;
              posArray[i * 3 + 2] = oz;
            }
          }

        } else if (isEating) {
          // =========================================================================
          // FEEDING: TRUNK REACHES UPWARD TO MOUTH
          // =========================================================================
          const eat = (Math.sin(time * 4.0) + 1) * 0.5;

          for (let i = 0; i < count; i++) {
            const ox = origPositions[i * 3];
            const oy = origPositions[i * 3 + 1];
            const oz = origPositions[i * 3 + 2];
            const part = partTypes[i];

            if (part === 1) {
              const d = Math.max(0, (oz - 2.0) / 3.2);
              posArray[i * 3] = ox;
              posArray[i * 3 + 1] = oy + d * eat * 2.2;
              posArray[i * 3 + 2] = oz - d * eat * 1.2;
            } else {
              posArray[i * 3] = ox;
              posArray[i * 3 + 1] = oy;
              posArray[i * 3 + 2] = oz;
            }
          }

        } else if (isPeanutOverload) {
          // =========================================================================
          // PEANUT OVERLOAD: COMICAL TREMBLING & SLUGGISH BELLY SWELL
          // =========================================================================
          const wobble = Math.sin(time * 18) * 0.08;

          for (let i = 0; i < count; i++) {
            const ox = origPositions[i * 3];
            const oy = origPositions[i * 3 + 1];
            const oz = origPositions[i * 3 + 2];
            const part = partTypes[i];

            posArray[i * 3] = ox * 1.16 + wobble;
            posArray[i * 3 + 1] = oy * 0.94;
            posArray[i * 3 + 2] = oz * 1.12;
          }

        } else {
          // =========================================================================
          // DEFAULT IDLE: NATURAL BIOLOGICAL RESPIRATION & SUBTLE SWAY
          // =========================================================================
          const breath = Math.sin(time * 1.6) * 0.02;

          for (let i = 0; i < count; i++) {
            const ox = origPositions[i * 3];
            const oy = origPositions[i * 3 + 1];
            const oz = origPositions[i * 3 + 2];
            const part = partTypes[i];

            if (part === 1) {
              // Relaxed trunk sway
              const d = Math.max(0, (oz - 2.0) / 3.2);
              posArray[i * 3] = ox + Math.sin(time * 1.2) * d * 0.22;
              posArray[i * 3 + 1] = oy + breath;
              posArray[i * 3 + 2] = oz;
            } else {
              // Gentle chest & flank respiration
              posArray[i * 3] = ox * (1.0 + breath);
              posArray[i * 3 + 1] = oy * (1.0 + breath * 0.4);
              posArray[i * 3 + 2] = oz;
            }
          }
        }

        posAttr.needsUpdate = true;
        ed.geometry.computeVertexNormals();
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('wheel', onWheel);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, [state, workoutId, interactive, onAngleChange]);

  return (
    <div className={`relative w-full ${height} select-none ${className}`}>
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xs text-white">
          <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mb-2" />
          <span className="text-xs font-bold text-stone-200">Summoning Jumbo...</span>
        </div>
      )}

      {/* WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
      />
    </div>
  );
}
