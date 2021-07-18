import { configureStore } from '@reduxjs/toolkit';
import orders from '../reducers/orders';

export const store = configureStore({
  reducer: {
    orders,
  },
});

export default store;
