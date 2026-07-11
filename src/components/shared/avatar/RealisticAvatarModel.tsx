import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useGraph } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLTF, SkeletonUtils } from 'three-stdlib';

interface AvatarModelProps {
  skinColor: string;
  mood: 'happy' | 'smart' | 'focused';
  gender: 'male' | 'female';
  topColor: string;
  bottomColor: string;
}

type GLTFResult = GLTF & {
  nodes: any;
  materials: any;
};

export function RealisticAvatarModel({
  skinColor,
  mood,
  gender,
  topColor,
  bottomColor,
}: AvatarModelProps) {
  const headRef = useRef<THREE.Group>(null);

  // Preload both models
  const { scene: maleScene } = useGLTF('/models/Thanh.glb');
  const { scene: femaleScene } = useGLTF('/models/ThamColor.glb');

  const scene = gender === 'female' ? femaleScene : maleScene;

  // Clone to avoid mutating the cached original if used multiple times
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as GLTFResult;

  // Removed unused materialProps

  // Apply Skin and Clothing Color Customization
  useEffect(() => {
    if (materials.Wolf3D_Skin) {
      materials.Wolf3D_Skin.color.set(skinColor);
    }
    if (materials.Wolf3D_Body) {
      materials.Wolf3D_Body.color.set(skinColor);
    }
    if (materials.Wolf3D_Outfit_Top) {
      materials.Wolf3D_Outfit_Top.color.set(topColor);
    }
    if (materials.Wolf3D_Outfit_Bottom) {
      materials.Wolf3D_Outfit_Bottom.color.set(bottomColor);
    }
  }, [skinColor, topColor, bottomColor, materials]);

  // Subtle procedural bone animation for a formal idle pose
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!nodes.Spine || !nodes.RightArm || !nodes.LeftArm || !nodes.Head)
      return;

    // Normal, formal standing posture
    // Breathing (subtle chest movement)
    nodes.Spine.rotation.x = Math.sin(t * 1.5) * 0.01 - 0.02; // Very straight, slight breathing

    // Very subtle head look around
    nodes.Head.rotation.y = Math.sin(t * 0.5) * 0.03;
    nodes.Head.rotation.z = Math.sin(t * 0.3) * 0.01;

    // Using default GLTF A-pose for arms to avoid unnatural backward bending.
  });

  return (
    <group ref={headRef} position={[0, -0.9, 0]} dispose={null} scale={1.2}>
      {/* Avatar Skeleton Root */}
      <primitive object={nodes.Hips} />

      {/* Full Body Meshes */}
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />

      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
    </group>
  );
}

useGLTF.preload('/models/Thanh.glb');
useGLTF.preload('/models/ThamColor.glb');
