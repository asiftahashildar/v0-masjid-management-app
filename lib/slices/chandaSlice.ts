"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Contributor {
  id: number
  name: string
  amount: number
  date: string
}

interface ChandaState {
  contributors: Contributor[]
  members: string[]
}

const initialState: ChandaState = {
  contributors: [],
  members: [],
}

const chandaSlice = createSlice({
  name: "chanda",
  initialState,
  reducers: {
    addContributor: (state, action: PayloadAction<{ name: string; amount: number }>) => {
      const newContributor: Contributor = {
        id: Date.now(),
        name: action.payload.name,
        amount: action.payload.amount,
        date: new Date().toLocaleDateString("en-IN"),
      }
      state.contributors.push(newContributor)
    },
    deleteContributor: (state, action: PayloadAction<number>) => {
      state.contributors = state.contributors.filter((c) => c.id !== action.payload)
    },
    addMember: (state, action: PayloadAction<string>) => {
      if (!state.members.includes(action.payload)) {
        state.members.push(action.payload)
      }
    },
    removeMember: (state, action: PayloadAction<string>) => {
      state.members = state.members.filter((m) => m !== action.payload)
    },
    setContributors: (state, action: PayloadAction<Contributor[]>) => {
      state.contributors = action.payload
    },
    setMembers: (state, action: PayloadAction<string[]>) => {
      state.members = action.payload
    },
  },
})

export const { addContributor, deleteContributor, addMember, removeMember, setContributors, setMembers } =
  chandaSlice.actions
export default chandaSlice.reducer
