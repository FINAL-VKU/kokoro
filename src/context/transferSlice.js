// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {STORAGE} from "../utils/storage";

const transferSlice = createSlice({
    name: 'transfer',
    initialState: {
        transfer: JSON.parse(localStorage.getItem('transfer')) || null,
        isTransfer: !localStorage.getItem('user'),
    },
    reducers: {
        transferPackage: (state, action) => {
            state.isTransfer = true;
            // state.transfer = action.payload;
            localStorage.setItem('transfer', JSON.stringify(action.payload));
        },
        transferHandlerPackage: (state) => {
            state.isTransfer = false;
            localStorage.removeItem('transfer');
        }
    },
});

export const { transferPackage, transferHandlerPackage } = transferSlice.actions;
export default transferSlice.reducer;
