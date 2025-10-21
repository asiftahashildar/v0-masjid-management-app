"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { addTiming, updateTiming } from "@/lib/slices/namazSlice"

const prayers = [
  { key: "fajr", label: "Fajr", icon: "🌙" },
  { key: "dhuhr", label: "Dhuhr", icon: "☀️" },
  { key: "asr", label: "Asr", icon: "🌤️" },
  { key: "maghrib", label: "Maghrib", icon: "🌅" },
  { key: "isha", label: "Isha", icon: "🌙" },
]

export default function NamazTimingsSection() {
  const dispatch = useAppDispatch()
  const timings = useAppSelector((state) => state.namaz.timings)

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [editingPrayer, setEditingPrayer] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  const handleEditPrayer = (prayerName: string) => {
    const timing = timings.find((t) => t.name === prayerName)
    if (timing) {
      setEditingPrayer(prayerName)
      setEditValue(timing.time)
    }
  }

  const handleSavePrayer = (prayerName: string) => {
    if (!editValue.trim()) {
      setError("Please enter a time")
      return
    }

    const timing = timings.find((t) => t.name === prayerName)
    if (timing) {
      dispatch(updateTiming({ id: timing.id, time: editValue }))
      setEditingPrayer(null)
      setError("")
      setSuccess(`${prayerName} timing updated successfully`)
      setTimeout(() => setSuccess(""), 3000)
    }
  }

  const handleAddTiming = (prayerName: string) => {
    if (timings.find((t) => t.name === prayerName)) {
      return
    }
    dispatch(addTiming({ name: prayerName, time: "00:00" }))
  }

  // Ensure all prayers have timings
  prayers.forEach((prayer) => {
    if (!timings.find((t) => t.name === prayer.label)) {
      handleAddTiming(prayer.label)
    }
  })

  return (
    <div className="space-y-6">
      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-4 rounded-lg">{success}</div>}

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-6">Update Namaz Timings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {prayers.map((prayer) => {
            const timing = timings.find((t) => t.name === prayer.label)
            return (
              <div key={prayer.key} className="p-4 bg-neutral-light rounded-lg">
                <div className="text-3xl mb-2">{prayer.icon}</div>
                <p className="font-semibold text-neutral-dark mb-3">{prayer.label}</p>
                {editingPrayer === prayer.label ? (
                  <div className="space-y-2">
                    <input
                      type="time"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                    <Button
                      onClick={() => handleSavePrayer(prayer.label)}
                      className="w-full bg-primary hover:bg-blue-700 text-white px-3 py-1 text-sm rounded-lg transition"
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="text-2xl font-bold text-primary mb-2">{timing?.time || "00:00"}</p>
                    <Button
                      onClick={() => handleEditPrayer(prayer.label)}
                      className="w-full bg-accent hover:bg-emerald-600 text-white px-3 py-1 text-sm rounded-lg transition"
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Today's Schedule</h3>
        <div className="space-y-3">
          {prayers.map((prayer) => {
            const timing = timings.find((t) => t.name === prayer.label)
            return (
              <div key={prayer.key} className="flex items-center justify-between p-4 bg-neutral-light rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{prayer.icon}</span>
                  <div>
                    <p className="font-semibold text-neutral-dark">{prayer.label}</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-primary">{timing?.time || "00:00"}</p>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
