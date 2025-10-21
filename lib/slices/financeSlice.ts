"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Expense {
  id: number
  category: string
  amount: number
  date: string
}

interface FinanceState {
  expenses: Expense[]
  totalBalance: number
}

const initialState: FinanceState = {
  expenses: [],
  totalBalance: 0,
}

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<{ category: string; amount: number }>) => {
      const newExpense: Expense = {
        id: Date.now(),
        category: action.payload.category,
        amount: action.payload.amount,
        date: new Date().toLocaleDateString("en-IN"),
      }
      state.expenses.push(newExpense)
    },
    deleteExpense: (state, action: PayloadAction<number>) => {
      state.expenses = state.expenses.filter((e) => e.id !== action.payload)
    },
    setTotalBalance: (state, action: PayloadAction<number>) => {
      state.totalBalance = action.payload
    },
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.expenses = action.payload
    },
  },
})

export const { addExpense, deleteExpense, setTotalBalance, setExpenses } = financeSlice.actions
export default financeSlice.reducer
