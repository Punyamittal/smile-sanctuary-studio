import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

/** A stylized 3D tooth shape built from primitives */
const ToothModel = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef} scale={1.4}>
        {/* Crown */}
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.7, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
          <meshStandardMaterial color="#f0f0f0" roughness={0.15} metalness={0.05} />
        </mesh>
        {/* Crown top cap */}
        <mesh position={[0, 0.55, 0]} rotation={[0, 0, 0]}>
          <sphereGeometry args={[0.5, 32, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.05} />
        </mesh>
        {/* Root left */}
        <mesh position={[-0.2, -0.6, 0]} rotation={[0, 0, 0.15]}>
          <coneGeometry args={[0.18, 0.8, 16]} />
          <meshStandardMaterial color="#f5f0e8" roughness={0.3} metalness={0} />
        </mesh>
        {/* Root right */}
        <mesh position={[0.2, -0.6, 0]} rotation={[0, 0, -0.15]}>
          <coneGeometry args={[0.18, 0.8, 16]} />
          <meshStandardMaterial color="#f5f0e8" roughness={0.3} metalness={0} />
        </mesh>
        {/* Gum line ring */}
        <mesh position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.55, 0.06, 16, 32]} />
          <meshStandardMaterial color="#4dc9f6" roughness={0.4} metalness={0.1} transparent opacity={0.6} />
        </mesh>
      </group>
    </Float>
  );
};

const Tooth3D = ({ className }: { className?: string }) => (
  <div className={className}>
    <Canvas
      camera={{ position: [0, 0, 4], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-3, 2, 4]} intensity={0.5} color="#4dc9f6" />
        <pointLight position={[0, -2, 3]} intensity={0.3} color="#ff8c42" />
        <ToothModel />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  </div>
);

export default Tooth3D;
