import { configureStore } from '@reduxjs/toolkit';
import audiosReducer from '../component/AudioSlice';


export const store = configureStore({
    reducer: {
        audios: audiosReducer,
    },
});