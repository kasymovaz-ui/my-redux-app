// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import tasksReducer from './tasksSlice'; // ← добавь

export const store = configureStore({
  reducer: {
    data: dataReducer,
    tasks: tasksReducer, // ← добавь
  },
});