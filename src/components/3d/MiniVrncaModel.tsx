
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Mini 3D Model component
const MiniModel = () => {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/vrnca-heead/VRNCA_4__0404022903_texture.glb');
  
  useFrame(({ clock }) => {
    if (modelRef.current) {
      // Constant rotation
      modelRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });
  
  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      scale={0.8} 
      position={[0, 0, 0]} 
    />
  );
};

// Simple fallback model when the GLTF fails to load
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
