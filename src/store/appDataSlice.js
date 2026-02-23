import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fakeData from '../data/fakeData.json';

// Имитация запроса с задержкой 1.2 секунды
export const fetchAppData = createAsyncThunk(
  'appData/fetchAppData',
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fakeData);
      }, 1200);
    });
  }
);

const initialState = {
  data: null,
  status: 'idle', // idle | loading | succeeded | failed
  error: null
};

const appDataSlice = createSlice({
  name: 'appData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAppData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default appDataSlice.reducer;