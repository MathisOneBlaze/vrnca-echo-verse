
import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

const MiniVrncaModelInner = () => {
  const gltf = useLoader(GLTFLoader, '/VRNCA_4__0404022903_texture.glb');
  const modelRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (modelRef.current) {
      // Constant rotation
      modelRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });
  
  return (
    <group ref={modelRef} position={[0, 0, 0]} scale={2}>
      <primitive object={gltf.scene} />
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
          <MiniVrncaModelInner />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default MiniVrncaModel;
