"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface JummaEntry {
  id: number
  week: number
  month: string
  year: number
  date: string
  amount: number
}

interface JummaState {
  jummaChanda: JummaEntry[]
}

const initialState: JummaState = {
  jummaChanda: [],
}

const jummaSlice = createSlice({
  name: "jumma",
  initialState,
  reducers: {
    addJummaChanda: (state, action: PayloadAction<{ week: number; month: string; year: number; amount: number }>) => {
      const newEntry: JummaEntry = {
        id: Date.now(),
        week: action.payload.week,
        month: action.payload.month,
        year: action.payload.year,
        date: new Date().toLocaleDateString("en-IN"),
        amount: action.payload.amount,
      }
      state.jummaChanda.push(newEntry)
    },
    deleteJummaChanda: (state, action: PayloadAction<number>) => {
      state.jummaChanda = state.jummaChanda.filter((j) => j.id !== action.payload)
    },
    updateJummaChanda: (state, action: PayloadAction<{ id: number; amount: number }>) => {
      const entry = state.jummaChanda.find((j) => j.id === action.payload.id)
      if (entry) {
        entry.amount = action.payload.amount
      }
    },
    setJummaChanda: (state, action: PayloadAction<JummaEntry[]>) => {
      state.jummaChanda = action.payload
    },
  },
})

export const { addJummaChanda, deleteJummaChanda, updateJummaChanda, setJummaChanda } = jummaSlice.actions
export default jummaSlice.reducer
