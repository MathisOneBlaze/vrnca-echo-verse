
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Simple custom model since the GLTF is not loading properly
const MiniModel = () => {
  const modelRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (modelRef.current) {
      // Constant rotation
      modelRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });
  
  return (
    <group ref={modelRef} position={[0, 0, 0]} scale={0.8}>
      {/* Main head sphere */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#00f5d4" wireframe />
      </mesh>
      
      {/* Orbital elements */}
      <group rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.9, 16, 8]} />
          <meshStandardMaterial color="#00f5d4" opacity={0.3} transparent={true} />
        </mesh>
      </group>
      
      <group rotation={[0, 0, Math.PI / 4]}>
        <mesh>
          <sphereGeometry args={[1.1, 16, 8]} />
          <meshStandardMaterial color="#00f5d4" opacity={0.2} transparent={true} />
        </mesh>
      </group>
    </group>
  );
};

// Simple fallback model is now our main model
const FallbackModel = () => {
  const modelRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (modelRef.current) {
      // Constant rotation
      modelRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });
  
  return (
    <group ref={modelRef} position={[0, 0, 0]} scale={1}>
      <mesh>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color="#00f5d4" />
      </mesh>
      <mesh position={[0, 0, 0.5]}>
        <boxGeometry args={[0.2, 0.2, 0.8]} />
        <meshStandardMaterial color="#00f5d4" />
      </mesh>
    </group>
  );
};

interface MiniVrncaModelProps {
  className?: string;
}

const MiniVrncaModel: React.FC<MiniVrncaModelProps> = ({ className }) => {
  return (
    <div className={`${className}`} style={{ width: '40px', height: '40px' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <React.Suspense fallback={<FallbackModel />}>
          <MiniModel />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default MiniVrncaModel;
