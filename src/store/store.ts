import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../lib/features/authSlice'
import newsReducer from '../lib/features/newsSlice'
import payoutReducer from '../lib/features/payoutSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      news: newsReducer,
      payouts: payoutReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']