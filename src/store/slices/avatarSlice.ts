import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ShirtType = 'basic' | 'hoodie' | 'suit' | 'vest';
export type PantsType = 'basic' | 'shorts' | 'cargo';
export type ShoeType = 'boots' | 'sneakers' | 'loafers';

export interface AvatarState {
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
}

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
