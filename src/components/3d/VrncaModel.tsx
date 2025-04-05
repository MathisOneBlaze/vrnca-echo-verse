
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 3D Model component - using custom geometry instead of GLTF
const Model = () => {
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
      {/* Main head sphere */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#00f5d4" wireframe />
      </mesh>
      
      {/* Orbital elements */}
      <group rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[1, 0.05, 16, 100]} />
          <meshStandardMaterial color="#00f5d4" />
        </mesh>
      </group>
      
      <group rotation={[0, Math.PI / 4, Math.PI / 4]}>
        <mesh>
          <torusGeometry args={[1.2, 0.05, 16, 100]} />
          <meshStandardMaterial color="#00f5d4" opacity={0.7} transparent={true} />
        </mesh>
      </group>
      
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.9, 0.05, 16, 100]} />
          <meshStandardMaterial color="#00f5d4" opacity={0.5} transparent={true} />
        </mesh>
      </group>
      
      {/* Particles */}
      {Array.from({ length: 50 }).map((_, i) => {
        const radius = 1.5;
        const angle = (i / 50) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 0.5;
        
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color="#00f5d4" />
          </mesh>
        );
      })}
    </group>
  );
};

// Simple fallback model when the main model fails to load
const FallbackModel = () => {
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
        <React.Suspense fallback={<FallbackModel />}>
          <Model />
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
