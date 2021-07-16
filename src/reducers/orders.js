import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addItems: (state, { payload }) => ({
      items: [...state.items, ...payload],
    }),
    decrement: (state) => {
      const value = state.value - 1;
      return {
        value,
      };
    },
    incrementByAmount: (state, action) => {
      const value = state.value + action.payload;
      return {
        value,
      };
    },
  },
});

export const { addItems, decrement, incrementByAmount } = orders.actions;

export const selectCount = (state) => state.counter.value;

export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default orders.reducer;
