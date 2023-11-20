import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  id?: number;
  name?: string;
  email?: string;
  username?: string;
  accessToken?: string;
}

export interface PayloadLogin {
  username: string;
  password: string;
}

const initialState: CounterState = {
  id: undefined,
  name: undefined,
  email: undefined,
  username: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<PayloadLogin>) => {
      localStorage.setItem('accessToken');
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = authSlice.actions;

export default authSlice.reducer;
