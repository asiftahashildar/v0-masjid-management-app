"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface UserDashboardProps {
  onLogout: () => void
}

export default function UserDashboard({ onLogout }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "chanda", label: "Chanda Status", icon: "🤝" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "namaz", label: "Namaz Timings", icon: "⏰" },
  ]

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Header */}
      <header className="bg-white border-b border-neutral-light shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-white text-lg">🕌</div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-dark">Jamia Masjid</h1>
              <p className="text-sm text-neutral-dark/60">User Portal</p>
            </div>
          </div>
          <Button onClick={onLogout} className="bg-error hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
            Logout
          </Button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-neutral-light sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                  activeTab === tab.id
                    ? "border-accent text-accent"
                    : "border-transparent text-neutral-dark/60 hover:text-neutral-dark"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && <UserOverviewSection />}
        {activeTab === "chanda" && <UserChandaSection />}
        {activeTab === "notifications" && <UserNotificationsSection />}
        {activeTab === "namaz" && <UserNamazSection />}
      </main>
    </div>
  )
}

function UserOverviewSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Masjid Information</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-neutral-dark/60">Leader</p>
            <p className="font-medium text-neutral-dark">Sheikh Ahmed Hassan</p>
          </div>
          <div>
            <p className="text-sm text-neutral-dark/60">Accountant</p>
            <p className="font-medium text-neutral-dark">Muhammad Ali</p>
          </div>
          <div>
            <p className="text-sm text-neutral-dark/60">Total Members</p>
            <p className="font-medium text-neutral-dark">127</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Quick Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-neutral-dark/60">Account Balance</span>
            <span className="font-semibold text-accent">$5,240</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-dark/60">Total Chanda</span>
            <span className="font-semibold text-primary">$3,850</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

function UserChandaSection() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-neutral-dark mb-4">Your Chanda Status</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-neutral-light rounded-lg">
          <div>
            <p className="font-medium text-neutral-dark">Last Week</p>
            <p className="text-sm text-neutral-dark/60">Oct 18, 2025</p>
          </div>
          <span className="text-lg font-bold text-accent">✓ Contributed</span>
        </div>
        <div className="flex justify-between items-center p-4 bg-neutral-light rounded-lg">
          <div>
            <p className="font-medium text-neutral-dark">This Week</p>
            <p className="text-sm text-neutral-dark/60">Oct 25, 2025</p>
          </div>
          <span className="text-lg font-bold text-warning">Pending</span>
        </div>
      </div>
    </Card>
  )
}

function UserNotificationsSection() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-neutral-dark mb-4">Notifications</h3>
      <div className="space-y-3">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="font-medium text-neutral-dark">Jummah Prayer Reminder</p>
          <p className="text-sm text-neutral-dark/60 mt-1">Jummah prayer starts at 1:30 PM tomorrow</p>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <p className="font-medium text-neutral-dark">Chanda Collection</p>
          <p className="text-sm text-neutral-dark/60 mt-1">Weekly chanda collection this Friday</p>
        </div>
      </div>
    </Card>
  )
}

function UserNamazSection() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-neutral-dark mb-4">Today's Namaz Timings</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { name: "Fajr", time: "5:45 AM" },
          { name: "Dhuhr", time: "12:30 PM" },
          { name: "Asr", time: "3:45 PM" },
          { name: "Maghrib", time: "6:15 PM" },
          { name: "Isha", time: "7:45 PM" },
        ].map((prayer) => (
          <div key={prayer.name} className="p-4 bg-neutral-light rounded-lg text-center">
            <p className="font-semibold text-neutral-dark">{prayer.name}</p>
            <p className="text-lg font-bold text-primary mt-2">{prayer.time}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
