// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';

// Старые слайсы (оставляем как было)
import dataReducer from './dataSlice';
import tasksReducer from './tasksSlice'; // если у тебя есть tasksSlice

// Новый слайс для данных из JSON с задержкой
import appDataReducer from './appDataSlice';

export const store = configureStore({
  reducer: {
    // Старые редьюсеры (если они у тебя есть)
    data: dataReducer,
    tasks: tasksReducer,

    // Новый редьюсер — основной для всех данных из fakeData.json
    appData: appDataReducer,
  },
});