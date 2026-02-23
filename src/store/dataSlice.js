// src/store/dataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: 'Жайна',
    age: '20',
    city: 'Токмок',
  },
  hobbies: ['программирование', 'путешествия', 'чтение книг', 'фотография'],
  message: 'Привет! Это данные из Redux Toolkit 😊',
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
});

export default dataSlice.reducer;