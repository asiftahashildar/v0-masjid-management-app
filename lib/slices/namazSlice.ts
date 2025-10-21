"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface NamazTiming {
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
      if (!state.timings.find((t) => t.name === action.payload.name)) {
        state.timings.push({
          name: action.payload.name,
          time: action.payload.time,
          date: new Date().toLocaleDateString("en-IN"),
        })
      }
    },
    updateTiming: (state, action: PayloadAction<{ name: string; time: string }>) => {
      const timing = state.timings.find((t) => t.name === action.payload.name)
      if (timing) {
        timing.time = action.payload.time
      }
    },
    setTimings: (state, action: PayloadAction<NamazTiming[]>) => {
      state.timings = action.payload
    },
    deleteTiming: (state, action: PayloadAction<string>) => {
      state.timings = state.timings.filter((t) => t.name !== action.payload)
    },
  },
})

export const { addTiming, updateTiming, setTimings, deleteTiming } = namazSlice.actions
export default namazSlice.reducer
