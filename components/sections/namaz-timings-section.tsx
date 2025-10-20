"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { namazAPI } from "@/lib/api-client"

export default function NamazTimingsSection() {
  const [timings, setTimings] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [editingPrayer, setEditingPrayer] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

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
      setError("")
    } catch (err) {
      setError("Failed to load namaz timings")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleEditPrayer = (key: string) => {
    setEditingPrayer(key)
    setEditValue(timings[key])
  }

  const handleSavePrayer = async (key: string) => {
    try {
      await namazAPI.updateTimings({
        ...timings,
        [key]: editValue,
      })
      await loadTimings()
      setEditingPrayer(null)
      setError("")
    } catch (err) {
      setError("Failed to update timing")
      console.error(err)
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <div className="space-y-6">
      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>}

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-6">Update Namaz Timings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {prayers.map((prayer) => (
            <div key={prayer.key} className="p-4 bg-neutral-light rounded-lg">
              <div className="text-3xl mb-2">{prayer.icon}</div>
              <p className="font-semibold text-neutral-dark mb-3">{prayer.label}</p>
              {editingPrayer === prayer.key ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                  <Button
                    onClick={() => handleSavePrayer(prayer.key)}
                    className="w-full bg-primary hover:bg-blue-700 text-white px-3 py-1 text-sm rounded-lg transition"
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-2xl font-bold text-primary mb-2">{timings?.[prayer.key]}</p>
                  <Button
                    onClick={() => handleEditPrayer(prayer.key)}
                    className="w-full bg-accent hover:bg-emerald-600 text-white px-3 py-1 text-sm rounded-lg transition"
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Today's Schedule</h3>
        <div className="space-y-3">
          {prayers.map((prayer) => (
            <div key={prayer.key} className="flex items-center justify-between p-4 bg-neutral-light rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{prayer.icon}</span>
                <div>
                  <p className="font-semibold text-neutral-dark">{prayer.label}</p>
                </div>
              </div>
              <p className="text-lg font-bold text-primary">{timings?.[prayer.key]}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
