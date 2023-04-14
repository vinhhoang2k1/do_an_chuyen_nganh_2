import { configureStore } from '@reduxjs/toolkit'
// import { postApi } from './services/postApi'
import { userApi } from './services/userApi'
import { shipApi } from './services/shipApi'
import { scheduleApi } from './services/scheduleApi'
import { routeApi } from './services/routeApi'
import authSliceReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    // [postApi.reducerPath]: postApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [shipApi.reducerPath]: shipApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
    [routeApi.reducerPath]: routeApi.reducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, shipApi.middleware, scheduleApi.middleware, routeApi.middleware),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
