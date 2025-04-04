
import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';

const VrncaModelInner = () => {
  const gltf = useLoader(GLTFLoader, '/VRNCA_4__0404022903_texture.glb');
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
}

const VrncaModel: React.FC<VrncaModelProps> = ({ className }) => {
  return (
    <div className={`relative ${className}`}>
      <Canvas
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
