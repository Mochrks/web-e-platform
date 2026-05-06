import {
  configureStore,
  combineReducers,
  UnknownAction,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './slices/authSlice';
import sidebarReducer from './slices/sidebarSlice';
import avatarReducer from './slices/avatarSlice';
import chatReducer from './slices/chatSlice';
import onboardingReducer from './slices/onboardingSlice';

const appReducer = combineReducers({
  auth: authReducer,
  sidebar: sidebarReducer,
  avatar: avatarReducer,
  chat: chatReducer,
  onboarding: onboardingReducer,
});

const rootReducer = (state: any, action: UnknownAction) => {
  // Clear all data when logout is dispatched
  if (action.type === 'auth/logout') {
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
