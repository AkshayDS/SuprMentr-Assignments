import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function GlassShape({ position, rotation, scale, geometry }) {
  const meshRef = useRef();

  useFrame((state) => {
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={3}>
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale} geometry={geometry}>
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.9}
          opacity={1}
          metalness={0.1}
          roughness={0.1}
          ior={1.5}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function ThreeDScene() {
  const geometries = [
    new THREE.IcosahedronGeometry(1.2, 0),
    new THREE.TorusGeometry(0.8, 0.3, 16, 100),
    new THREE.OctahedronGeometry(1, 0),
    new THREE.DodecahedronGeometry(1, 0),
    new THREE.SphereGeometry(0.9, 32, 32)
  ];

  return (
    <div className="three-scene-container">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        {/* Lights to make the glass reflect beautiful colors */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ff00ff" />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#00ffff" />
        <spotLight position={[0, 10, 0]} intensity={3} color="#ffff00" />
        <spotLight position={[0, -10, 0]} intensity={2} color="#ff0000" />
        
        <Environment preset="city" />

        {/* Group of floating glass objects */}
        <group position={[0, 0.5, 0]}>
          <GlassShape position={[-2, 1, 0]} rotation={[0.5, 0.2, 0]} scale={0.8} geometry={geometries[0]} />
          <GlassShape position={[2, -1, 1]} rotation={[0, 0.5, 0.5]} scale={1} geometry={geometries[1]} />
          <GlassShape position={[0, 2, -2]} rotation={[0.2, 0, 0.8]} scale={0.7} geometry={geometries[2]} />
          <GlassShape position={[-2.5, -2, 0]} rotation={[0.8, 0.2, 0]} scale={0.9} geometry={geometries[3]} />
          <GlassShape position={[2.5, 2, -1]} rotation={[0, 0, 0]} scale={0.6} geometry={geometries[4]} />
        </group>

        {/* Soft shadow below the objects */}
        <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={2} far={10} />
      </Canvas>
    </div>
  );
}
