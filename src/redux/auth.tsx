import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token:null,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
          
            state.user = action.payload;
        },
        logout: (state) => {
            
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state: any) => state.auth;
export default authSlice.reducer;
