import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
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
}

const initialState: CounterState = {
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
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogin } = authSlice.actions;

export default authSlice.reducer;
