import { configureStore } from '@reduxjs/toolkit'
// import { postApi } from './services/postApi'
import { userApi } from './services/userApi'
import { trainApi } from './services/trainApi'
import { scheduleApi } from './services/scheduleApi'
import { trainStationApi } from './services/trainStationApi'
import { loginApi } from './services/loginApi'
import authSliceReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    // [postApi.reducerPath]: postApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [trainApi.reducerPath]: trainApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
    [trainStationApi.reducerPath]: trainStationApi.reducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware,userApi.middleware, trainApi.middleware, scheduleApi.middleware, trainStationApi.middleware),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
