"use client"

import { useState, useEffect } from "react"
import LoginForm from "@/components/auth/login-form"
import AdminDashboard from "@/components/dashboard/admin-dashboard"
import UserDashboard from "@/components/dashboard/user-dashboard"
import { useLocalStoragePersist } from "@/lib/useLocalStorage"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<"admin" | "user" | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useLocalStoragePersist()

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const handleLogin = (role: "admin" | "user") => {
    setUserRole(role)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole(null)
  }

  if (!isHydrated) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <>
      {userRole === "admin" && <AdminDashboard onLogout={handleLogout} />}
      {userRole === "user" && <UserDashboard onLogout={handleLogout} />}
    </>
  )
}
