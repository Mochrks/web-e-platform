import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthState } from '@/types/auth';
import { getCookie, setCookie, removeCookie } from '@/lib/cookies';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    hydrate: (state) => {
      const token = getCookie('token');
      const role = getCookie('role');
      const userStr = getCookie('user');

      if (token) {
        state.token = token;
        state.role = role || 'employee';
        state.isAuthenticated = true;
        if (userStr) {
          try {
            state.user = JSON.parse(userStr);
          } catch (e) {
            state.user = null;
          }
        }
      }
    },
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
      }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.role = user.role || 'employee';
      state.isAuthenticated = true;

      if (typeof window !== 'undefined') {
        setCookie('token', token, 7);
        setCookie('role', user.role || 'employee', 7);
        setCookie('userId', user.userId.toString(), 7);
        setCookie('user', JSON.stringify(user), 7);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;

      if (typeof window !== 'undefined') {
        removeCookie('token');
        removeCookie('role');
        removeCookie('userId');
        removeCookie('user');
        localStorage.clear();
        sessionStorage.clear();
      }
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { hydrate, setCredentials, logout, updateUser } =
  authSlice.actions;
export default authSlice.reducer;
