'use client';

import React from 'react';
import TalentAvatarUI from './TalentAvatarUI';
import TalentAvatar3D from './TalentAvatar3D';
import { useAppSelector } from '@/store';
import { ShirtType, PantsType, ShoeType } from '@/store/slices/avatarSlice';

interface TalentAvatarProps {
  shirtColor?: string;
  pantsColor?: string;
  headphoneColor?: string;
  glassesColor?: string;
  skinColor?: string;
  shirtType?: ShirtType;
  pantsType?: PantsType;
  shoeType?: ShoeType;
  size?: number;
  mood?: 'happy' | 'thinking' | 'serious';
  hasGlasses?: boolean;
  hasHeadphones?: boolean;
  isAnimated?: boolean;
  is3D?: boolean;
  className?: string;
}

export default function TalentAvatar(props: TalentAvatarProps) {
  const avatarState = useAppSelector((state) => state.avatar);

  const finalProps = {
    shirtColor: props.shirtColor || avatarState.shirtColor,
    pantsColor: props.pantsColor || avatarState.pantsColor,
    headphoneColor: props.headphoneColor || avatarState.headphoneColor,
    glassesColor: props.glassesColor || avatarState.glassesColor,
    skinColor: props.skinColor || avatarState.skinColor,
    shirtType: props.shirtType || avatarState.shirtType,
    pantsType: props.pantsType || avatarState.pantsType,
    shoeType: props.shoeType || avatarState.shoeType,
    size: props.size || 200,
    mood: props.mood || avatarState.mood,
    hasGlasses:
      props.hasGlasses !== undefined
        ? props.hasGlasses
        : avatarState.hasGlasses,
    hasHeadphones:
      props.hasHeadphones !== undefined
        ? props.hasHeadphones
        : avatarState.hasHeadphones,
    isAnimated: props.isAnimated !== undefined ? props.isAnimated : true,
    is3D: props.is3D !== undefined ? props.is3D : true,
    className: props.className || '',
  };

  if (finalProps.is3D) {
    return <TalentAvatar3D {...finalProps} />;
  }

  return (
    <TalentAvatarUI
      color={finalProps.shirtColor}
      accessoryColor={finalProps.glassesColor}
      {...finalProps}
    />
  );
}
