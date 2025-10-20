"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { namazAPI } from "@/lib/api-client"

export default function UserNamazSection() {
  const [timings, setTimings] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const prayers = [
    { key: "fajr", label: "Fajr", icon: "🌙" },
    { key: "dhuhr", label: "Dhuhr", icon: "☀️" },
    { key: "asr", label: "Asr", icon: "🌤️" },
    { key: "maghrib", label: "Maghrib", icon: "🌅" },
    { key: "isha", label: "Isha", icon: "🌙" },
  ]

  useEffect(() => {
    loadTimings()
  }, [])

  const loadTimings = async () => {
    try {
      setLoading(true)
      const data = await namazAPI.getTimings()
      setTimings(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-neutral-dark mb-4">Today's Namaz Timings</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {prayers.map((prayer) => (
          <div key={prayer.key} className="p-4 bg-neutral-light rounded-lg text-center">
            <div className="text-2xl mb-2">{prayer.icon}</div>
            <p className="font-semibold text-neutral-dark">{prayer.label}</p>
            <p className="text-lg font-bold text-primary mt-2">{timings?.[prayer.key] || "N/A"}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
