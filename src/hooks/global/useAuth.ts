'use client';

import { useAppDispatch, useAppSelector } from '@/store';
import {
  loginSuccess,
  logout as logoutAction,
  User,
} from '@/store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, token, role } = useAppSelector(
    (state) => state.auth
  );

  const login = (userData: User, token: string, role: 'employee' | 'admin') => {
    dispatch(loginSuccess({ user: userData, token, role }));
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return {
    user,
    isAuthenticated,
    token,
    login,
    logout,
  };
};
