'use client';

import React from 'react';
import TalentAvatarUI from './TalentAvatarUI';
import TalentAvatar3D from './TalentAvatar3D';
import { useAppSelector } from '@/store';
import { TalentAvatarProps } from '@/types/avatar';

export default function TalentAvatar(props: Readonly<TalentAvatarProps>) {
  const avatarState = useAppSelector((state) => state.avatar);

  const finalProps = {
    skinColor: props.skinColor || avatarState.skinColor,
    size: props.size || 200,
    mood: props.mood || avatarState.mood,
    gender: props.gender || avatarState.gender,
    topColor: props.topColor || avatarState.topColor,
    bottomColor: props.bottomColor || avatarState.bottomColor,
    isAnimated: props.isAnimated ?? true,
    is3D: props.is3D ?? true,
    className: props.className || '',
  };

  if (finalProps.is3D) {
    return <TalentAvatar3D {...finalProps} />;
  }

  return <TalentAvatarUI color={finalProps.skinColor} {...finalProps} />;
}
