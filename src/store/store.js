import { configureStore } from '@reduxjs/toolkit';
import audiosReducer from '../component/AudioSlice';

// создаем хранилище для аудио плеера и передаем в него редьюсер аудио плеера

export const store = configureStore({
    reducer: {
        audios: audiosReducer,
    },
});
