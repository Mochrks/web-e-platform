import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AvatarState } from '@/types/avatar';

const initialState: AvatarState = {
  skinColor: '#fcc419',
  mood: 'happy',
  gender: 'male',
  topColor: '#ffffff',
  bottomColor: '#1e293b',
};

const avatarSlice = createSlice({
  name: 'avatar',
  initialState,
  reducers: {
    updateAvatar: (state, action: PayloadAction<Partial<AvatarState>>) => {
      return { ...state, ...action.payload };
    },
    resetAvatar: () => initialState,
  },
});

export const { updateAvatar, resetAvatar } = avatarSlice.actions;
export default avatarSlice.reducer;
