import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  filters: {},
};

export const orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addItems: (state, { payload }) => ({
      ...state,
      items: [...state.items, ...payload],
    }),
    serachFilter: (state, { payload }) => ({
      ...state,
      filters: {
        ...state.filters,
        ...payload,
      },
    }),
    clearItems: () => ({ items: [], filters: {} }),
    clearFilter: (state) => ({ ...state, filters: {} }),
  },
});

export const {
  addItems, serachFilter, clearItems, clearFilter,
} = orders.actions;

export default orders.reducer;
