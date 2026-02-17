import { configureStore } from '@reduxjs/toolkit';

import salesReducer from './slices/salesSlice';
import itemsReducer from './slices/itemsSlice';

export const store = configureStore({
    reducer: {
        sales: salesReducer,
        items: itemsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
