// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {STORAGE} from "../utils/storage";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        isLoggedIn: !!localStorage.getItem('user'),
    },
    reducers: {
        loginWeb: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logoutWeb: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            localStorage.removeItem('user');
            localStorage.removeItem(STORAGE.token)
        }
    },
});

export const { loginWeb, logoutWeb } = userSlice.actions;
export default userSlice.reducer;
