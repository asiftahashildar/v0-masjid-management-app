"use client"

import { useState } from "react"
import LoginForm from "@/components/auth/login-form"
import AdminDashboard from "@/components/dashboard/admin-dashboard"
import UserDashboard from "@/components/dashboard/user-dashboard"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<"admin" | "user" | null>(null)

  const handleLogin = (role: "admin" | "user") => {
    setUserRole(role)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole(null)
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
