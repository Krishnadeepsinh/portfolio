import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Torus, OrbitControls, Stars, Trail } from "@react-three/drei";
import * as THREE from "three";

/** Tracks normalized 0..1 page scroll progress. */
function useScrollY01() {
  const ref = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      ref.current = Math.min(1, Math.max(0, window.scrollY / max));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return ref;
}

function CameraRig({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  useFrame((state) => {
    const s = scrollRef.current;
    const m = state.mouse;
    const targetZ = 7 + s * 5;
    const targetY = s * -1.5 + m.y * 0.5;
    const targetX = Math.sin(s * Math.PI * 0.6) * 1.0 + m.x * 0.6;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

/** Central pulsing neural node */
function NeuralNode({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const innerRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s = scrollRef.current;
    const pulse = 1 + Math.sin(t * 1.6) * 0.08;
    if (innerRef.current) {
      innerRef.current.scale.setScalar(pulse * (1 - s * 0.25));
      innerRef.current.rotation.y = t * 0.5;
      innerRef.current.rotation.z = t * 0.3;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(pulse * 1.5 * (1 - s * 0.25));
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.12 + Math.sin(t * 2) * 0.04;
    }
  });

  return (
    <group>
      <Sphere ref={glowRef} args={[1, 32, 32]}>
        <meshBasicMaterial color="#475EF5" transparent opacity={0.15} />
      </Sphere>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial
          color="#F7F7FF"
          emissive="#F7F7FF"
          emissiveIntensity={1.5}
          wireframe
        />
      </mesh>
    </group>
  );
}


/** Concentric orbital rings around the core */
function OrbitalRings({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const g = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!g.current) return;
    const t = state.clock.elapsedTime;
    const s = scrollRef.current;
    const m = state.mouse;
    g.current.rotation.y = t * 0.08 + s * Math.PI * 0.5;
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, m.y * 0.25 + s * 0.4, 0.04);
    g.current.rotation.z = THREE.MathUtils.lerp(g.current.rotation.z, m.x * 0.15, 0.04);
    const scale = 1 - s * 0.15;
    g.current.scale.set(scale, scale, scale);
  });

  return (
    <group ref={g}>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.4}>
        <Torus args={[1.7, 0.012, 12, 48]} rotation={[Math.PI / 2.2, 0, 0]}>
          <meshStandardMaterial color="#F7F7FF" emissive="#F7F7FF" emissiveIntensity={1.4} />
        </Torus>
      </Float>

      <Float speed={1.7} rotationIntensity={0.8} floatIntensity={0.5}>
        <Torus args={[2.2, 0.01, 12, 48]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <meshStandardMaterial color="#475EF5" emissive="#475EF5" emissiveIntensity={1.4} />
        </Torus>
      </Float>

      <Float speed={2.0} rotationIntensity={1.0} floatIntensity={0.6}>
        <Torus args={[2.7, 0.008, 12, 48]} rotation={[Math.PI / 4, -Math.PI / 5, Math.PI / 6]}>
          <meshStandardMaterial color="#ADAEFF" emissive="#ADAEFF" emissiveIntensity={1.2} />
        </Torus>
      </Float>

      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.3}>
        <Torus args={[3.3, 0.006, 12, 48]} rotation={[Math.PI / 5, Math.PI / 3, -Math.PI / 8]}>
          <meshStandardMaterial color="#F7F7FF" emissive="#F7F7FF" emissiveIntensity={0.9} />
        </Torus>
      </Float>
    </group>
  );
}

/** Small electron-like particles orbiting the core on different rings */
function Electrons({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const refs = useRef<Array<THREE.Mesh | null>>([]);
  const orbits = useMemo(
    () => [
      { r: 1.7, speed: 0.8, tilt: [Math.PI / 2.2, 0, 0], color: "#F7F7FF", phase: 0 },
      { r: 2.2, speed: 0.55, tilt: [Math.PI / 3, Math.PI / 4, 0], color: "#475EF5", phase: 1.3 },
      { r: 2.7, speed: 0.42, tilt: [Math.PI / 4, -Math.PI / 5, Math.PI / 6], color: "#ADAEFF", phase: 2.6 },
      { r: 3.3, speed: 0.32, tilt: [Math.PI / 5, Math.PI / 3, -Math.PI / 8], color: "#F7F7FF", phase: 4.1 },
    ],
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s = scrollRef.current;
    orbits.forEach((o, i) => {
      const m = refs.current[i];
      if (!m) return;
      const a = t * o.speed + o.phase + s * Math.PI;
      const x = Math.cos(a) * o.r;
      const z = Math.sin(a) * o.r;
      const v = new THREE.Vector3(x, 0, z);
      const e = new THREE.Euler(o.tilt[0], o.tilt[1], o.tilt[2]);
      v.applyEuler(e);
      m.position.set(v.x, v.y, v.z);
    });
  });

  return (
    <group>
      {orbits.map((o, i) => (
        <Trail
          key={i}
          width={0.6}
          length={5}
          color={o.color as any}
          attenuation={(t) => t * t}
        >
          <mesh ref={(el) => (refs.current[i] = el)}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial color={o.color} emissive={o.color} emissiveIntensity={2.5} />
          </mesh>
        </Trail>
      ))}
    </group>
  );
}

function ParticleField({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      // sphere shell distribution for depth
      const r = 6 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const s = scrollRef.current;
    ref.current.rotation.y = state.clock.elapsedTime * 0.018 + s * 0.6;
    ref.current.rotation.x = state.clock.elapsedTime * 0.008;
    ref.current.position.z = s * 7;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.size = 0.022 + Math.sin(state.clock.elapsedTime * 1.5) * 0.004;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#F7F7FF" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

interface HeroSceneProps {
  showControls?: boolean;
}

const HeroScene = ({ showControls = false }: HeroSceneProps) => {
  const scrollRef = useScrollY01();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  if (!ready) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 60 }}
      dpr={[1, 1.2]}
      gl={{ 
        antialias: false, 
        alpha: true, 
        powerPreference: "high-performance",
        stencil: false,
        depth: true
      }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 5, 5]} intensity={1.4} color="#F7F7FF" />
      <pointLight position={[-5, -5, 5]} intensity={1.1} color="#475EF5" />
      <pointLight position={[0, 5, -5]} intensity={0.9} color="#ADAEFF" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#F7F7FF" distance={8} decay={2} />

      <CameraRig scrollRef={scrollRef} />
      <NeuralNode scrollRef={scrollRef} />
      <OrbitalRings scrollRef={scrollRef} />
      <Electrons scrollRef={scrollRef} />
      <ParticleField scrollRef={scrollRef} />
      <Stars radius={60} depth={50} count={1000} factor={2.5} fade speed={1} />

      {showControls && <OrbitControls enableZoom={false} enablePan={false} />}
    </Canvas>
  );
};

export default HeroScene;
