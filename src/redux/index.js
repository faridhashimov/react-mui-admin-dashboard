import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { adminApi } from './adminApi/adminApi'
import { userReducer } from './userSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        [adminApi.reducerPath]: adminApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(adminApi.middleware),
})


setupListeners(store.dispatch)