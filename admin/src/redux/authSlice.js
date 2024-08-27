import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        admin: null,
        loading: false
    },
    reducers: {
        setAdmin(state, action) {
            state.admin = action.payload;  // This should be null after logout
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    }
});

export const { setAdmin, setLoading } = authSlice.actions;
export default authSlice.reducer;
