
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const VrncaModelInner = () => {
  // Update the file path to point to the correct location in the public folder
  const gltf = useLoader(GLTFLoader, '/vrnca head/VRNCA_4__0404022903_texture.glb');
  const modelRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (modelRef.current) {
      // Gentle floating animation
      modelRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
      // Gentle rotation
      modelRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });
  
  return (
    <group ref={modelRef} position={[0, 0, 0]} scale={1.5}>
      <primitive object={gltf.scene} />
    </group>
  );
};

interface VrncaModelProps {
  className?: string;
  scale?: number;
  showLoader?: boolean;
}

const VrncaModel: React.FC<VrncaModelProps> = ({ className, scale = 1.5, showLoader = true }) => {
  const [loading, setLoading] = useState(true);

  const handleModelLoaded = () => {
    setLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      {showLoader && loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-evrgrn-darker/50 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-evrgrn-accent mb-2"></div>
            <p className="text-evrgrn-accent text-sm">Chargement de VRNCA...</p>
          </div>
        </div>
      )}
      
      <Canvas
        onCreated={handleModelLoaded}
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />
        <React.Suspense fallback={null}>
          <VrncaModelInner />
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 2 - 0.5}
            maxPolarAngle={Math.PI / 2 + 0.5}
          />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default VrncaModel;
