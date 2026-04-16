'use client';

import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store';
import { updateAvatar, AvatarState } from '@/store/slices/avatarSlice';
import { toast } from 'sonner';

export const useSettingsPageHook = () => {
  const [activeTab, setActiveTab] = useState('Profile & Avatar');
  const dispatch = useAppDispatch();
  const avatarState = useAppSelector((state) => state.avatar);

  const handleUpdateAvatar = (updates: Partial<AvatarState>) => {
    dispatch(updateAvatar(updates));
    toast.success('Avatar styling updated!');
  };

  return {
    activeTab,
    setActiveTab,
    avatarState,
    handleUpdateAvatar,
  };
};
