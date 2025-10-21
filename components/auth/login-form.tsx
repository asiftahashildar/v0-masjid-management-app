"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface LoginFormProps {
  onLogin: (role: "admin" | "user") => void
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Simple validation - in production, use proper authentication
    if (username === "admin" && password === "admin123") {
      onLogin("admin")
    } else {
      setError("Invalid admin credentials")
    }
  }

  const handleUserLogin = () => {
    setError("")
    onLogin("user")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-lg mb-4">
              <span className="text-white text-xl font-bold">🕌</span>
            </div>
            <h1 className="text-3xl font-bold text-neutral-dark mb-2">Jamia Masjid</h1>
            <h3 className="text-1xl font-bold text-neutral-dark mb-2">NEJ</h3>
            <p className="text-neutral-dark/60">Management System</p>
          </div>

          {/* Admin Login */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-neutral-dark mb-4">Admin Login</h2>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-dark mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-dark mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              {error && (
                <div className="p-3 bg-error/10 border border-error/20 rounded-lg text-error text-sm">{error}</div>
              )}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
              >
                Login as Admin
              </Button>
            </form>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-light"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-dark/50">or</span>
            </div>
          </div>

          {/* User Login */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-dark mb-4">User Access</h2>
            <p className="text-sm text-neutral-dark/60 mb-4">
              View-only access to Masjid information and notifications
            </p>
            <Button
              onClick={handleUserLogin}
              className="w-full bg-accent hover:bg-emerald-600 text-white font-medium py-2 rounded-lg transition"
            >
              Login as User
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
