import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function WireGlobe() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });
  return (
    <Sphere ref={ref} args={[1.6, 32, 32]}>
      <meshStandardMaterial
        color="#F7F7FF"
        emissive="#F7F7FF"
        emissiveIntensity={0.5}
        wireframe
        transparent
        opacity={0.85}
      />
    </Sphere>
  );
}

function OrbitingDot({ radius, speed, color, offset }: { radius: number; speed: number; color: string; offset: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 0.7) * 0.3;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
    </mesh>
  );
}

const AvatarScene = () => {
  const dots = useMemo(
    () => [
      { r: 2.0, s: 0.6, c: "#F7F7FF", o: 0 },
      { r: 2.2, s: 0.4, c: "#475EF5", o: 1.5 },
      { r: 2.4, s: 0.5, c: "#ADAEFF", o: 3 },
      { r: 1.9, s: 0.7, c: "#F7F7FF", o: 4.5 },
    ],
    []
  );
  return (
    <Canvas 
      camera={{ position: [0, 0, 5], fov: 55 }} 
      dpr={[1, 1]} 
      gl={{ antialias: false, alpha: true, powerPreference: "default" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={1} color="#F7F7FF" />
      <pointLight position={[-3, -3, 3]} intensity={1} color="#475EF5" />
      <Float speed={1} rotationIntensity={0.4} floatIntensity={0.6}>
        <WireGlobe />
        {dots.map((d, i) => (
          <OrbitingDot key={i} radius={d.r} speed={d.s} color={d.c} offset={d.o} />
        ))}
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};

export default AvatarScene;
