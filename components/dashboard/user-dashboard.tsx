"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import UserOverviewSection from "@/components/sections/user-overview-section"
import UserChandaSection from "@/components/sections/user-chanda-section"
import UserNotificationsSection from "@/components/sections/user-notifications-section"
import UserNamazSection from "@/components/sections/user-namaz-section"
import UserReportsSection from "@/components/sections/user-reports-section"

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
    { id: "reports", label: "Reports", icon: "📈" },
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
        {activeTab === "reports" && <UserReportsSection />}
      </main>
    </div>
  )
}
