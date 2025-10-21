"use client"

import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "./store"

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = useSelector as <T>(selector: (state: RootState) => T) => T
