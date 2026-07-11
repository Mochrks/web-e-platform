export interface AvatarState {
  skinColor: string;
  mood: 'happy' | 'smart' | 'focused';
  gender: 'male' | 'female';
  topColor: string;
  bottomColor: string;
}

export interface TalentAvatarProps {
  skinColor?: string;
  size?: number;
  mood?: 'happy' | 'smart' | 'focused';
  gender?: 'male' | 'female';
  isAnimated?: boolean;
  is3D?: boolean;
  className?: string;
  topColor?: string;
  bottomColor?: string;
}
