'use client';

import React from 'react';
import TalentAvatarUI from './TalentAvatarUI';
import TalentAvatar3D from './TalentAvatar3D';
import { useAppSelector } from '@/store';
import {
  ShirtType,
  PantsType,
  ShoeType,
  TalentAvatarProps,
} from '@/types/avatar';

export default function TalentAvatar(props: Readonly<TalentAvatarProps>) {
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
    hasGlasses: props.hasGlasses ?? avatarState.hasGlasses,
    hasHeadphones: props.hasHeadphones ?? avatarState.hasHeadphones,
    isAnimated: props.isAnimated ?? true,
    is3D: props.is3D ?? true,
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
