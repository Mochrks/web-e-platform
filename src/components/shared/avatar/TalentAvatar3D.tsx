'use client';

import React, { useRef, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  ContactShadows,
  Environment,
  Float as FloatDrei,
} from '@react-three/drei';
import * as THREE from 'three';
import { ShirtType, PantsType, ShoeType } from '@/store/slices/avatarSlice';

interface TalentAvatar3DProps {
  shirtColor: string;
  pantsColor: string;
  headphoneColor: string;
  glassesColor: string;
  skinColor: string;
  shirtType: ShirtType;
  pantsType: PantsType;
  shoeType: ShoeType;
  mood: 'happy' | 'thinking' | 'serious';
  hasGlasses: boolean;
  hasHeadphones: boolean;
  size: number;
}

// Separate Model component and memoize it to prevent re-renders on parent state changes
const AvatarModel = memo(
  ({
    shirtColor,
    pantsColor,
    headphoneColor,
    glassesColor,
    skinColor,
    shirtType,
    pantsType,
    shoeType,
    mood,
    hasGlasses,
    hasHeadphones,
  }: Omit<TalentAvatar3DProps, 'size'>) => {
    const headRef = useRef<THREE.Group>(null);

    // Reusable materials to prevent creating them on every render
    const materialProps = useMemo(
      () => ({
        shirt: { color: shirtColor },
        pants: { color: pantsColor },
        headphone: { color: headphoneColor },
        glasses: { color: glassesColor, transparent: true, opacity: 0.7 },
        skin: { color: skinColor },
        black: { color: '#111' },
        white: { color: 'white' },
        red: { color: '#ef4444' },
      }),
      [shirtColor, pantsColor, headphoneColor, glassesColor, skinColor]
    );

    useFrame((state) => {
      const t = state.clock.getElapsedTime();
      if (headRef.current) {
        headRef.current.rotation.y = Math.sin(t * 0.4) * 0.08;
        headRef.current.rotation.x = Math.sin(t * 0.3) * 0.04;
      }
    });

    return (
      <group position={[0, 0.4, 0]}>
        {/* Torso */}
        <group position={[0, -0.4, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.7, 0.8, 0.4]} />
            <meshStandardMaterial {...materialProps.shirt} />
          </mesh>

          {/* Shirt Variants */}
          {shirtType === 'hoodie' && (
            <mesh position={[0, 0.4, -0.15]} rotation={[0.5, 0, 0]}>
              <torusGeometry args={[0.25, 0.12, 12, 24, Math.PI]} />
              <meshStandardMaterial {...materialProps.shirt} />
            </mesh>
          )}
          {shirtType === 'suit' && (
            <group position={[0, 0.1, 0.21]}>
              <mesh>
                <boxGeometry args={[0.1, 0.5, 0.01]} />
                <meshStandardMaterial {...materialProps.white} />
              </mesh>
              <mesh position={[0, 0.1, 0.01]} rotation={[0, 0, Math.PI]}>
                <coneGeometry args={[0.08, 0.2, 4]} />
                <meshStandardMaterial {...materialProps.red} />
              </mesh>
            </group>
          )}
          {shirtType === 'vest' && (
            <mesh position={[0, 0, 0.01]}>
              <boxGeometry args={[0.72, 0.82, 0.42]} />
              <meshStandardMaterial
                color="#111"
                transparent
                opacity={0.2}
                wireframe
              />
            </mesh>
          )}

          {/* Neck */}
          <mesh position={[0, 0.45, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.15, 16]} />
            <meshStandardMaterial {...materialProps.skin} />
          </mesh>
        </group>

        {/* Head Group */}
        <group ref={headRef} position={[0, 0.1, 0]}>
          <mesh castShadow position={[0, 0.3, 0]}>
            <boxGeometry args={[0.55, 0.55, 0.55]} />
            <meshStandardMaterial {...materialProps.skin} />

            {/* Face */}
            <group position={[0, 0, 0.28]}>
              {mood === 'happy' && (
                <>
                  <mesh
                    position={[-0.12, 0.05, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                  >
                    <cylinderGeometry args={[0.04, 0.04, 0.02, 12]} />
                    <meshStandardMaterial {...materialProps.black} />
                  </mesh>
                  <mesh
                    position={[0.12, 0.05, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                  >
                    <cylinderGeometry args={[0.04, 0.04, 0.02, 12]} />
                    <meshStandardMaterial {...materialProps.black} />
                  </mesh>
                  <mesh position={[0, -0.12, 0]} rotation={[0, 0, -Math.PI]}>
                    <torusGeometry args={[0.1, 0.02, 8, 12, Math.PI]} />
                    <meshStandardMaterial {...materialProps.black} />
                  </mesh>
                </>
              )}
              {mood === 'thinking' && (
                <>
                  <mesh position={[-0.12, 0.08, 0]}>
                    <boxGeometry args={[0.12, 0.02, 0.02]} />
                    <meshStandardMaterial {...materialProps.black} />
                  </mesh>
                  <mesh
                    position={[0.12, 0.05, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                  >
                    <cylinderGeometry args={[0.04, 0.04, 0.02, 12]} />
                    <meshStandardMaterial {...materialProps.black} />
                  </mesh>
                  <mesh position={[0, -0.12, 0]}>
                    <boxGeometry args={[0.1, 0.02, 0.02]} />
                    <meshStandardMaterial {...materialProps.black} />
                  </mesh>
                </>
              )}
              {mood === 'serious' && (
                <>
                  <mesh position={[-0.12, 0.05, 0]}>
                    <boxGeometry args={[0.12, 0.03, 0.02]} />
                    <meshStandardMaterial {...materialProps.black} />
                  </mesh>
                  <mesh position={[0.12, 0.05, 0]}>
                    <boxGeometry args={[0.12, 0.03, 0.02]} />
                    <meshStandardMaterial {...materialProps.black} />
                  </mesh>
                  <mesh position={[0, -0.12, 0]}>
                    <boxGeometry args={[0.15, 0.02, 0.02]} />
                    <meshStandardMaterial {...materialProps.black} />
                  </mesh>
                </>
              )}
            </group>
          </mesh>

          {/* Accessories */}
          {hasHeadphones && (
            <group position={[0, 0.3, 0]}>
              <mesh position={[0, 0.28, 0]}>
                <torusGeometry args={[0.32, 0.05, 12, 24, Math.PI]} />
                <meshStandardMaterial {...materialProps.headphone} />
              </mesh>
              <mesh position={[-0.32, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.18, 0.18, 0.12, 24]} />
                <meshStandardMaterial {...materialProps.headphone} />
              </mesh>
              <mesh position={[0.32, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                <cylinderGeometry args={[0.18, 0.18, 0.12, 24]} />
                <meshStandardMaterial {...materialProps.headphone} />
              </mesh>
            </group>
          )}
          {hasGlasses && (
            <group position={[0, 0.35, 0.28]}>
              <mesh position={[-0.15, 0, 0]}>
                <boxGeometry args={[0.22, 0.16, 0.05]} />
                <meshStandardMaterial {...materialProps.glasses} />
              </mesh>
              <mesh position={[0.15, 0, 0]}>
                <boxGeometry args={[0.22, 0.16, 0.05]} />
                <meshStandardMaterial {...materialProps.glasses} />
              </mesh>
            </group>
          )}
        </group>

        {/* Arms */}
        <group position={[-0.45, -0.2, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.22, 0.45, 0.22]} />
            <meshStandardMaterial {...materialProps.shirt} />
          </mesh>
          <mesh position={[0, -0.3, 0]}>
            <boxGeometry args={[0.2, 0.15, 0.2]} />
            <meshStandardMaterial {...materialProps.skin} />
          </mesh>
        </group>
        <group position={[0.45, -0.2, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.22, 0.45, 0.22]} />
            <meshStandardMaterial {...materialProps.shirt} />
          </mesh>
          <mesh position={[0, -0.3, 0]}>
            <boxGeometry args={[0.2, 0.15, 0.2]} />
            <meshStandardMaterial {...materialProps.skin} />
          </mesh>
        </group>

        {/* Legs & Shoe Variants */}
        <group position={[0, -0.85, 0]}>
          {/* Left Leg */}
          <group position={[-0.2, -0.2, 0]}>
            <mesh castShadow>
              <boxGeometry
                args={[0.3, pantsType === 'shorts' ? 0.45 : 0.85, 0.35]}
              />
              <meshStandardMaterial {...materialProps.pants} />
            </mesh>
            {pantsType === 'shorts' && (
              <mesh position={[0, -0.3, 0]}>
                <boxGeometry args={[0.28, 0.4, 0.33]} />
                <meshStandardMaterial {...materialProps.skin} />
              </mesh>
            )}
            {pantsType === 'cargo' && (
              <mesh position={[-0.16, 0, 0]}>
                <boxGeometry args={[0.08, 0.2, 0.2]} />
                <meshStandardMaterial {...materialProps.pants} />
              </mesh>
            )}
          </group>

          {/* Right Leg */}
          <group position={[0.2, -0.2, 0]}>
            <mesh castShadow>
              <boxGeometry
                args={[0.3, pantsType === 'shorts' ? 0.45 : 0.85, 0.35]}
              />
              <meshStandardMaterial {...materialProps.pants} />
            </mesh>
            {pantsType === 'shorts' && (
              <mesh position={[0, -0.3, 0]}>
                <boxGeometry args={[0.28, 0.4, 0.33]} />
                <meshStandardMaterial {...materialProps.skin} />
              </mesh>
            )}
            {pantsType === 'cargo' && (
              <mesh position={[0.16, 0, 0]}>
                <boxGeometry args={[0.08, 0.2, 0.2]} />
                <meshStandardMaterial {...materialProps.pants} />
              </mesh>
            )}
          </group>

          {/* Shoes */}
          <group position={[-0.2, -0.65, 0.05]}>
            {shoeType === 'boots' && (
              <mesh castShadow>
                <boxGeometry args={[0.35, 0.25, 0.5]} />
                <meshStandardMaterial color="#222" />
              </mesh>
            )}
            {shoeType === 'sneakers' && (
              <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
                <capsuleGeometry args={[0.15, 0.25, 4, 8]} />
                <meshStandardMaterial color="#eee" />
              </mesh>
            )}
            {shoeType === 'loafers' && (
              <mesh castShadow>
                <boxGeometry args={[0.32, 0.15, 0.45]} />
                <meshStandardMaterial color="#333" />
              </mesh>
            )}
          </group>
          <group position={[0.2, -0.65, 0.05]}>
            {shoeType === 'boots' && (
              <mesh castShadow>
                <boxGeometry args={[0.35, 0.25, 0.5]} />
                <meshStandardMaterial color="#222" />
              </mesh>
            )}
            {shoeType === 'sneakers' && (
              <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
                <capsuleGeometry args={[0.15, 0.25, 4, 8]} />
                <meshStandardMaterial color="#eee" />
              </mesh>
            )}
            {shoeType === 'loafers' && (
              <mesh castShadow>
                <boxGeometry args={[0.32, 0.15, 0.45]} />
                <meshStandardMaterial color="#333" />
              </mesh>
            )}
          </group>
        </group>
      </group>
    );
  }
);

AvatarModel.displayName = 'AvatarModel';

export default function TalentAvatar3D(props: TalentAvatar3DProps) {
  return (
    <div
      style={{ width: props.size, height: props.size }}
      className="relative bg-gradient-to-b from-primary/10 via-primary/5 to-transparent rounded-[2rem] overflow-hidden group shadow-inner"
    >
      <Canvas
        shadows
        camera={{ position: [0, 0.5, 5], fov: 32 }}
        flat
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
        <FloatDrei speed={1} rotationIntensity={0.12} floatIntensity={0.2}>
          <AvatarModel {...props} />
        </FloatDrei>
        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.3}
          scale={8}
          blur={3}
          far={2.5}
        />
        <Environment preset="city" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
