import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../slices/postSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});