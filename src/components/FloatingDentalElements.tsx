import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

/** Small floating dental-themed 3D icons for decorative use */

const Toothbrush = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.2;
    }
  });

  return (
    <Float speed={1.5} floatIntensity={0.5}>
      <group ref={ref} position={position} scale={0.6}>
        {/* Handle */}
        <mesh>
          <boxGeometry args={[0.12, 1.5, 0.08]} />
          <meshStandardMaterial color="#4dc9f6" roughness={0.3} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.9, 0]}>
          <boxGeometry args={[0.2, 0.4, 0.1]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
        {/* Bristles */}
        <mesh position={[0, 0.9, 0.08]}>
          <boxGeometry args={[0.16, 0.3, 0.05]} />
          <meshStandardMaterial color="#e0e0e0" roughness={0.6} />
        </mesh>
      </group>
    </Float>
  );
};

const MiniTooth = ({ position }: { position: [number, number, number] }) => (
  <Float speed={2} floatIntensity={0.6}>
    <group position={position} scale={0.35}>
      <mesh>
        <sphereGeometry args={[0.5, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial color="#ffffff" roughness={0.15} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, -0.4, 0]}>
        <coneGeometry args={[0.15, 0.5, 12]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.3} transparent opacity={0.8} />
      </mesh>
    </group>
  </Float>
);

const Shield3D = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.5;
    }
  });

  return (
    <Float speed={1.8} floatIntensity={0.4}>
      <mesh ref={ref} position={position} scale={0.5}>
        <sphereGeometry args={[0.5, 6, 6]} />
        <meshStandardMaterial color="#ff8c42" roughness={0.3} metalness={0.2} transparent opacity={0.7} />
      </mesh>
    </Float>
  );
};

const FloatingDentalElements = ({ className }: { className?: string }) => (
  <div className={className}>
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 5]} intensity={0.8} />
        <Toothbrush position={[-2.5, 1, 0]} />
        <MiniTooth position={[2.5, -0.5, 0]} />
        <MiniTooth position={[-1, -1.8, 1]} />
        <Shield3D position={[2, 1.5, -1]} />
        <Toothbrush position={[1, -1.5, 0.5]} />
      </Suspense>
    </Canvas>
  </div>
);

export default FloatingDentalElements;
