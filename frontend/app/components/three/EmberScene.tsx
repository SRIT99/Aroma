'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/** The molten, distorting "ember orb" — the page's signature 3D element. */
function EmberOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, mouse } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.08;
    meshRef.current.rotation.y = t * 0.12;
    // gentle parallax toward pointer
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      (mouse.x * viewport.width) / 22,
      0.04
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      (mouse.y * viewport.height) / 22,
      0.04
    );
  });

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.6}>
        <icosahedronGeometry args={[1, 8]} />
        <MeshDistortMaterial
          color="#ff5a1f"
          emissive="#b23a0e"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.3}
          distort={0.45}
          speed={1.6}
        />
      </mesh>
    </Float>
  );
}

function InnerGlow() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const s = 1.05 + Math.sin(t * 1.3) * 0.04;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.15, 32, 32]} />
      <meshBasicMaterial color="#e3b23c" transparent opacity={0.08} />
    </mesh>
  );
}

function Rig() {
  // Subtle whole-scene parallax on pointer move for depth
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.02;
    camera.position.y += (mouse.y * 0.4 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function EmberScene() {
  const dpr = useMemo(() => (typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1), []);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 5]} intensity={2} color="#e3b23c" />
      <pointLight position={[-4, -2, -3]} intensity={1.2} color="#ff5a1f" />
      <EmberOrb />
      <InnerGlow />
      <Sparkles count={80} scale={[6, 4, 3]} size={2.5} speed={0.35} color="#ffb37a" opacity={0.6} />
      <Rig />
    </Canvas>
  );
}
