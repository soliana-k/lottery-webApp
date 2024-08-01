
import { createSlice } from '@reduxjs/toolkit';

const lotterySlice = createSlice({
    name: 'lottery',
    initialState: {
        selectedNumber: null,
        paymentCompleted: false, 
    },
    reducers: {
        selectNumber(state, action) {
            const number = action.payload;
            if (state.selectedNumber === null) {
                state.selectedNumber = number;
            } else if (state.selectedNumber === number) {
                state.selectedNumber = null;
            } else {
                console.log('You can only select one number');
            }
        },
        completePayment(state) {
            state.paymentCompleted = true; 
        },
    },
});

export const { selectNumber, completePayment } = lotterySlice.actions;
export default lotterySlice.reducer;
