"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface NamazTiming {
  id: number
  name: string
  time: string
  date: string
}

interface NamazState {
  timings: NamazTiming[]
}

const initialState: NamazState = {
  timings: [],
}

const namazSlice = createSlice({
  name: "namaz",
  initialState,
  reducers: {
    addTiming: (state, action: PayloadAction<{ name: string; time: string }>) => {
      const newTiming: NamazTiming = {
        id: Date.now(),
        name: action.payload.name,
        time: action.payload.time,
        date: new Date().toLocaleDateString("en-IN"),
      }
      state.timings.push(newTiming)
    },
    updateTiming: (state, action: PayloadAction<{ id: number; time: string }>) => {
      const timing = state.timings.find((t) => t.id === action.payload.id)
      if (timing) {
        timing.time = action.payload.time
      }
    },
    deleteTiming: (state, action: PayloadAction<number>) => {
      state.timings = state.timings.filter((t) => t.id !== action.payload)
    },
    setTimings: (state, action: PayloadAction<NamazTiming[]>) => {
      state.timings = action.payload
    },
  },
})

export const { addTiming, updateTiming, deleteTiming, setTimings } = namazSlice.actions
export default namazSlice.reducer
