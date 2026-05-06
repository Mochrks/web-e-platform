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

export interface TalentAvatarProps {
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
