import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './authSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});

export default store;
