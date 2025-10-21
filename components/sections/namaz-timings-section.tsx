"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { addTiming, updateTiming } from "@/lib/slices/namazSlice"

const prayers = [
  { label: "Fajr", icon: "🌙" },
  { label: "Dhuhr", icon: "☀️" },
  { label: "Asr", icon: "🌤️" },
  { label: "Maghrib", icon: "🌅" },
  { label: "Isha", icon: "🌙" },
]

// Convert 24h -> 12h
const to12Hour = (time24: string) => {
  if (!time24) return "12:00AM"
  const [h, m] = time24.split(":")
  let hour = parseInt(h)
  const ampm = hour >= 12 ? "PM" : "AM"
  hour = hour % 12 || 12
  return `${hour}:${m.padStart(2, "0")}${ampm}`
}

// Convert 12h -> 24h
const to24Hour = (time12: string) => {
  const match = time12.match(/^(\d{1,2}):(\d{2})(AM|PM)$/i)
  if (!match) return null
  let [_, hourStr, minuteStr, ampm] = match
  let hour = parseInt(hourStr)
  const minute = minuteStr
  ampm = ampm.toUpperCase()
  if (ampm === "PM" && hour < 12) hour += 12
  if (ampm === "AM" && hour === 12) hour = 0
  return `${hour.toString().padStart(2, "0")}:${minute}`
}

export default function NamazTimingsSection() {
  const dispatch = useAppDispatch()
  const timings = useAppSelector((state) => state.namaz.timings)

  const [editingPrayer, setEditingPrayer] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<{ [key: string]: string }>({})
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Initialize missing prayers once
  useEffect(() => {
    prayers.forEach((prayer) => {
      if (!timings.find((t) => t.name === prayer.label)) {
        dispatch(addTiming({ name: prayer.label, time: "05:00" }))
      }
    })
  }, [dispatch, timings])

  const handleEdit = (label: string) => {
    const timing = timings.find((t) => t.name === label)
    setEditingPrayer(label)
    setEditValues((prev) => ({ ...prev, [label]: timing ? to12Hour(timing.time) : "12:00AM" }))
  }

  const handleChange = (label: string, value: string) => {
    setEditValues((prev) => ({ ...prev, [label]: value }))
  }

  const handleSave = (label: string) => {
    const value = editValues[label]?.trim()
    const time24 = to24Hour(value || "")
    if (!time24) {
      setError("Enter valid time (e.g., 5:15AM)")
      return
    }
    dispatch(updateTiming({ name: label, time: time24 }))
    setEditingPrayer(null)
    setError("")
    setSuccess(`${label} timing updated successfully`)
    setTimeout(() => setSuccess(""), 3000)
  }

  return (
    <div className="space-y-6">
      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-4 rounded-lg">{success}</div>}

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-6">Update Namaz Timings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {prayers.map((prayer) => {
            const timing = timings.find((t) => t.name === prayer.label)
            const value = editValues[prayer.label] || ""
            return (
              <div key={prayer.label} className="p-4 bg-neutral-light rounded-lg">
                <div className="text-3xl mb-2">{prayer.icon}</div>
                <p className="font-semibold text-neutral-dark mb-3">{prayer.label}</p>

                {editingPrayer === prayer.label ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="e.g., 5:15AM"
                      value={value}
                      onChange={(e) => handleChange(prayer.label, e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                    <Button onClick={() => handleSave(prayer.label)} className="w-full bg-primary text-white">
                      Save
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="text-2xl font-bold text-primary mb-2">{timing ? to12Hour(timing.time) : "12:00AM"}</p>
                    <Button onClick={() => handleEdit(prayer.label)} className="w-full bg-accent text-white">
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
              <div key={prayer.label} className="flex items-center justify-between p-4 bg-neutral-light rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{prayer.icon}</span>
                  <div>
                    <p className="font-semibold text-neutral-dark">{prayer.label}</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-primary">{timing ? to12Hour(timing.time) : "12:00AM"}</p>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
