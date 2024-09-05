
// import { createSlice } from '@reduxjs/toolkit';

// const lotterySlice = createSlice({
//     name: 'lottery',
//     initialState: {
//         selectedNumber: null,
//         paymentCompleted: false, 
//     },
//     reducers: {
//         selectNumber(state, action) {
//             const number = action.payload;
//             if (state.selectedNumber === null) {
//                 state.selectedNumber = number;
//             } else if (state.selectedNumber === number) {
//                 state.selectedNumber = null;
//             } else {
//                 console.log('You can only select one number');
//             }
//         },
//         completePayment(state) {
//             state.paymentCompleted = true; 
//         },
//     },
// });

// export const { selectNumber, completePayment } = lotterySlice.actions;
// export default lotterySlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to post data to the database
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
      .addCase(postLotteryData.fulfilled, (state, action) => {
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

