"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./hooks"
import { setExpenses, setTotalBalance } from "./slices/financeSlice"
import { setContributors, setMembers } from "./slices/chandaSlice"
import { setJummaChanda } from "./slices/jummaSlice"
import { setAssets } from "./slices/assetsSlice"
import { setCommittee } from "./slices/committeeSlice"
import { setNotifications } from "./slices/notificationsSlice"
import { setTimings } from "./slices/namazSlice"
import type { RootState } from "./store"

export function useLocalStoragePersist() {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state: RootState) => state)

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedExpenses = localStorage.getItem("masjid_expenses")
      const savedBalance = localStorage.getItem("masjid_balance")
      const savedContributors = localStorage.getItem("masjid_contributors")
      const savedMembers = localStorage.getItem("masjid_members")
      const savedJumma = localStorage.getItem("masjid_jumma")
      const savedAssets = localStorage.getItem("masjid_assets")
      const savedCommittee = localStorage.getItem("masjid_committee")
      const savedNotifications = localStorage.getItem("masjid_notifications")
      const savedTimings = localStorage.getItem("masjid_timings")

      if (savedExpenses) dispatch(setExpenses(JSON.parse(savedExpenses)))
      if (savedBalance) dispatch(setTotalBalance(JSON.parse(savedBalance)))
      if (savedContributors) dispatch(setContributors(JSON.parse(savedContributors)))
      if (savedMembers) dispatch(setMembers(JSON.parse(savedMembers)))
      if (savedJumma) dispatch(setJummaChanda(JSON.parse(savedJumma)))
      if (savedAssets) dispatch(setAssets(JSON.parse(savedAssets)))
      if (savedCommittee) dispatch(setCommittee(JSON.parse(savedCommittee)))
      if (savedNotifications) dispatch(setNotifications(JSON.parse(savedNotifications)))
      if (savedTimings) dispatch(setTimings(JSON.parse(savedTimings)))
    }
  }, [dispatch])

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("masjid_expenses", JSON.stringify(state.finance.expenses))
      localStorage.setItem("masjid_balance", JSON.stringify(state.finance.totalBalance))
      localStorage.setItem("masjid_contributors", JSON.stringify(state.chanda.contributors))
      localStorage.setItem("masjid_members", JSON.stringify(state.chanda.members))
      localStorage.setItem("masjid_jumma", JSON.stringify(state.jumma.jummaChanda))
      localStorage.setItem("masjid_assets", JSON.stringify(state.assets.assets))
      localStorage.setItem("masjid_committee", JSON.stringify(state.committee))
      localStorage.setItem("masjid_notifications", JSON.stringify(state.notifications.notifications))
      localStorage.setItem("masjid_timings", JSON.stringify(state.namaz.timings))
    }
  }, [state])
}
