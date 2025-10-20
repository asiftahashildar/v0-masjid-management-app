"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import FinanceSection from "@/components/sections/finance-section"
import ChandaSection from "@/components/sections/chanda-section"
import AssetsSection from "@/components/sections/assets-section"
import CommitteeSection from "@/components/sections/committee-section"
import NotificationsSection from "@/components/sections/notifications-section"
import NamazTimingsSection from "@/components/sections/namaz-timings-section"

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "finance", label: "Finance", icon: "💰" },
    { id: "chanda", label: "Chanda", icon: "🤝" },
    { id: "assets", label: "Assets", icon: "📦" },
    { id: "committee", label: "Committee", icon: "👥" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "namaz", label: "Namaz Timings", icon: "⏰" },
  ]

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Header */}
      <header className="bg-white border-b border-neutral-light shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-lg">
              🕌
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-dark">Jamia Masjid</h1>
              <p className="text-sm text-neutral-dark/60">Admin Dashboard</p>
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
                    ? "border-primary text-primary"
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
        {activeTab === "overview" && <OverviewSection />}
        {activeTab === "finance" && <FinanceSection />}
        {activeTab === "chanda" && <ChandaSection />}
        {activeTab === "assets" && <AssetsSection />}
        {activeTab === "committee" && <CommitteeSection />}
        {activeTab === "notifications" && <NotificationsSection />}
        {activeTab === "namaz" && <NamazTimingsSection />}
      </main>
    </div>
  )
}

function OverviewSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-neutral-dark/60 text-sm font-medium">Account Balance</p>
            <p className="text-3xl font-bold text-primary mt-2">$5,240</p>
          </div>
          <div className="text-4xl">💰</div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-neutral-dark/60 text-sm font-medium">Total Chanda</p>
            <p className="text-3xl font-bold text-accent mt-2">$3,850</p>
          </div>
          <div className="text-4xl">🤝</div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-neutral-dark/60 text-sm font-medium">Total Expenses</p>
            <p className="text-3xl font-bold text-warning mt-2">$1,390</p>
          </div>
          <div className="text-4xl">📊</div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-neutral-dark/60 text-sm font-medium">Members</p>
            <p className="text-3xl font-bold text-neutral-dark mt-2">127</p>
          </div>
          <div className="text-4xl">👥</div>
        </div>
      </Card>
    </div>
  )
}
