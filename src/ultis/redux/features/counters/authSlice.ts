import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  id?: number;
  name?: string;
  email?: string;
  username?: string;
  accessToken?: string;
  isLogined?: boolean;
}

export interface PayloadLogin {
  username?: string;
  password?: string;
  name?: string;
  email?: string;
  token?: string;
  isLogined?: boolean;
  id?: number;
}

const initialState: AuthState = {
  id: undefined,
  name: undefined,
  email: undefined,
  username: undefined,
  accessToken: undefined,
  isLogined: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<PayloadLogin>) => {
      state = { ...action.payload };
      return state;
    },
    logout: (state) => {
      state = { ...initialState };
      return state;
    },
  },
});

export const { setLogin, logout } = authSlice.actions;

export default authSlice.reducer;
