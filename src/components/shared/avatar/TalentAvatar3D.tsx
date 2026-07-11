'use client';

import React, { useRef, useMemo, memo, Suspense, lazy } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  ContactShadows,
  Float as FloatDrei,
  Environment,
} from '@react-three/drei';
import { RealisticAvatarModel } from './RealisticAvatarModel';

interface TalentAvatar3DProps {
  skinColor: string;
  mood: 'happy' | 'smart' | 'focused';
  size: number;
  gender: 'male' | 'female';
  topColor: string;
  bottomColor: string;
}

// We have moved the 3D model code to RealisticAvatarModel.tsx

export default function TalentAvatar3D(props: TalentAvatar3DProps) {
  const containerRef = useRef<any>(null);

  return (
    <div
      ref={containerRef}
      style={{ width: props.size, height: props.size }}
      className="relative bg-gradient-to-b from-primary/10 via-primary/5 to-transparent rounded-[2rem] overflow-hidden group "
    >
      <Canvas
        eventSource={containerRef}
        shadows
        camera={{ position: [0, 0.2, 3.2], fov: 28 }}
        flat
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
        frameloop="demand"
      >
        <Environment files="/environment/venice_sunset_1k.hdr" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
        <directionalLight position={[-3, 5, -3]} intensity={0.5} />
        <FloatDrei speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
          <Suspense fallback={null}>
            <RealisticAvatarModel {...props} />
          </Suspense>
        </FloatDrei>
        <ContactShadows
          position={[0, -0.9, 0]}
          opacity={0.8}
          scale={5}
          blur={1.5}
          far={2}
          color="#1e293b"
        />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          minDistance={1.5}
          maxDistance={5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          target={[0, 0.8, 0]}
        />
      </Canvas>
    </div>
  );
}
