
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ModelProps {
  modelPath?: string;
}

// 3D Model component - using GLTF model
const Model: React.FC<ModelProps> = ({ modelPath }) => {
  const modelRef = useRef<THREE.Group>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelError, setModelError] = useState(false);
  
  // Attempt to load the GLTF model
  useEffect(() => {
    const loader = new GLTFLoader();
    const path = modelPath || '/VRNCA_4__0404022903_texture.glb';
    console.log('Attempting to load VRNCA model from:', path);
    
    loader.load(
      path,
      (gltf) => {
        console.log('VRNCA model loaded successfully:', gltf);
        setModelLoaded(true);
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total) * 100, '%');
      },
      (error) => {
        console.error('Error loading VRNCA model:', error);
        setModelError(true);
      }
    );
  }, [modelPath]);
  
  useFrame(({ clock }) => {
    if (modelRef.current) {
      // Gentle floating animation
      modelRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
      // Gentle rotation
      modelRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });
  
  // If there was an error loading the model, render a custom geometry
  if (modelError) {
    console.log('Using fallback model due to loading error');
    return <FallbackModel />;
  }
  
  // If model is still loading, show nothing (loader is handled by parent)
  if (!modelLoaded) {
    return null;
  }
  
  // Try to render the GLB model
  try {
    const path = modelPath || '/VRNCA_4__0404022903_texture.glb';
    const gltf = useLoader(GLTFLoader, path);
    console.log('VRNCA model rendered successfully');
    
    return (
      <primitive 
        ref={modelRef} 
        object={gltf.scene} 
        position={[0, 0, 0]}
        scale={1.5}
      />
    );
  } catch (error) {
    console.error("Error rendering VRNCA model:", error);
    // If there's an error, render the fallback model
    return <FallbackModel />;
  }
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

interface VrncaModelProps {
  className?: string;
  scale?: number;
  showLoader?: boolean;
  modelPath?: string;
}

const VrncaModel: React.FC<VrncaModelProps> = ({ className, scale = 1.5, showLoader = true, modelPath }) => {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const handleModelLoaded = () => {
    console.log('Model loaded event triggered');
    setLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      {showLoader && loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-evrgrn-darker/50 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-evrgrn-accent mb-2"></div>
            <p className="text-evrgrn-accent text-sm">Chargement du modèle...</p>
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
          <Model modelPath={modelPath} />
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
