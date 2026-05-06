import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AvatarState } from '@/types/avatar';

const initialState: AvatarState = {
  shirtColor: '#3b82f6',
  pantsColor: '#1e293b',
  headphoneColor: '#1a1a1a',
  glassesColor: '#7c3aed',
  skinColor: '#fcc419',
  shirtType: 'basic',
  pantsType: 'basic',
  shoeType: 'boots',
  mood: 'happy',
  hasGlasses: true,
  hasHeadphones: true,
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
