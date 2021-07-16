import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import orders from '../reducers/orders';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    orders,
  },
});

export default store;
