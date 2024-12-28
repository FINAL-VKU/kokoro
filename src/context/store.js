// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import transferSlice from "./transferSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        transfer: transferSlice
    },
});

export default store;
