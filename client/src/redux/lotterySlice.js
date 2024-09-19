import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for posting lottery data
export const postLotteryData = createAsyncThunk(
  'lottery/postLotteryData',
  async ({ number, email }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/lottery/start-lottery', { number, email });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Lottery slice
const lotterySlice = createSlice({
  name: 'lottery',
  initialState: {
    selectedNumber: null,
    email: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    completeSelection(state, action) {
      state.selectedNumber = action.payload.number;
      state.email = action.payload.email;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLotteryData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postLotteryData.fulfilled, (state) => {
        state.status = 'succeeded';
        state.selectedNumber = null;
        state.email = null;
      })
      .addCase(postLotteryData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { completeSelection } = lotterySlice.actions;
export default lotterySlice.reducer;
