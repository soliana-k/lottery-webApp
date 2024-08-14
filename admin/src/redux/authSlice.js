import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:null,
        loading:false
    },
    
    reducers: {
        setUser(state, action) {
            state.admin = action.payload;  // Ensure this sets the user data correctly
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    }

});
export const { setAdmin, setLoading} = authSlice.actions;
export default authSlice.reducer;