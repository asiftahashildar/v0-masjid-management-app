"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface CommitteeMember {
  id: number
  name: string
  role: string
}

interface CommitteeState {
  leader: string
  accountant: string
  members: CommitteeMember[]
}

const initialState: CommitteeState = {
  leader: "",
  accountant: "",
  members: [],
}

const committeeSlice = createSlice({
  name: "committee",
  initialState,
  reducers: {
    setLeader: (state, action: PayloadAction<string>) => {
      state.leader = action.payload
    },
    setAccountant: (state, action: PayloadAction<string>) => {
      state.accountant = action.payload
    },
    addMember: (state, action: PayloadAction<{ name: string; role: string }>) => {
      const newMember: CommitteeMember = {
        id: Date.now(),
        name: action.payload.name,
        role: action.payload.role,
      }
      state.members.push(newMember)
    },
    deleteMember: (state, action: PayloadAction<number>) => {
      state.members = state.members.filter((m) => m.id !== action.payload)
    },
    setCommittee: (state, action: PayloadAction<CommitteeState>) => {
      return action.payload
    },
  },
})

export const { setLeader, setAccountant, addMember, deleteMember, setCommittee } = committeeSlice.actions
export default committeeSlice.reducer
