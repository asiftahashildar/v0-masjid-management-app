"use client"

import { configureStore } from "@reduxjs/toolkit"
import financeReducer from "./slices/financeSlice"
import chandaReducer from "./slices/chandaSlice"
import jummaReducer from "./slices/jummaSlice"
import assetsReducer from "./slices/assetsSlice"
import committeeReducer from "./slices/committeeSlice"
import notificationsReducer from "./slices/notificationsSlice"
import namazReducer from "./slices/namazSlice"

export const store = configureStore({
  reducer: {
    finance: financeReducer,
    chanda: chandaReducer,
    jumma: jummaReducer,
    assets: assetsReducer,
    committee: committeeReducer,
    notifications: notificationsReducer,
    namaz: namazReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
