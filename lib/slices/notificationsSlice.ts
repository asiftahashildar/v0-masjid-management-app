"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Notification {
  id: number
  title: string
  message: string
  date: string
}

interface NotificationsState {
  notifications: Notification[]
}

const initialState: NotificationsState = {
  notifications: [],
}

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<{ title: string; message: string }>) => {
      const newNotification: Notification = {
        id: Date.now(),
        title: action.payload.title,
        message: action.payload.message,
        date: new Date().toLocaleDateString("en-IN"),
      }
      state.notifications.push(newNotification)
    },
    deleteNotification: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload)
    },
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload
    },
  },
})

export const { addNotification, deleteNotification, setNotifications } = notificationsSlice.actions
export default notificationsSlice.reducer
