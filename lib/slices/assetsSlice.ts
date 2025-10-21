"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Asset {
  id: number
  name: string
  category: string
  quantity: number
  date: string
}

interface AssetsState {
  assets: Asset[]
}

const initialState: AssetsState = {
  assets: [],
}

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<{ name: string; category: string; quantity: number }>) => {
      const newAsset: Asset = {
        id: Date.now(),
        name: action.payload.name,
        category: action.payload.category,
        quantity: action.payload.quantity,
        date: new Date().toLocaleDateString("en-IN"),
      }
      state.assets.push(newAsset)
    },
    deleteAsset: (state, action: PayloadAction<number>) => {
      state.assets = state.assets.filter((a) => a.id !== action.payload)
    },
    updateAsset: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const asset = state.assets.find((a) => a.id === action.payload.id)
      if (asset) {
        asset.quantity = action.payload.quantity
      }
    },
    setAssets: (state, action: PayloadAction<Asset[]>) => {
      state.assets = action.payload
    },
  },
})

export const { addAsset, deleteAsset, updateAsset, setAssets } = assetsSlice.actions
export default assetsSlice.reducer
