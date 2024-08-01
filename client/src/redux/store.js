import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import lotterySlice from "./lotterySlice";


const store = configureStore({
    reducer:{
        auth:authSlice,
        lottery: lotterySlice

    }
});
export default store;

