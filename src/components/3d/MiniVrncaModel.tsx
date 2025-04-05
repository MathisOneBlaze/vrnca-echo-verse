
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

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
      <Sphere args={[0.7, 16, 16]}>
        <meshStandardMaterial color="#00f5d4" />
      </Sphere>
      <Box args={[0.2, 0.2, 0.8]} position={[0, 0, 0.5]}>
        <meshStandardMaterial color="#00f5d4" />
      </Box>
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
        <React.Suspense fallback={null}>
          <FallbackModel />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default MiniVrncaModel;
