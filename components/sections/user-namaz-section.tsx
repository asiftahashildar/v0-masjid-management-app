"use client"

import { Card } from "@/components/ui/card"
import { useAppSelector } from "@/lib/hooks"

export default function UserNamazSection() {
  const timings = useAppSelector((state) => state.namaz.timings)

  const prayers = [
    { key: "fajr", label: "Fajr", icon: "🌙" },
    { key: "dhuhr", label: "Dhuhr", icon: "☀️" },
    { key: "asr", label: "Asr", icon: "🌤️" },
    { key: "maghrib", label: "Maghrib", icon: "🌅" },
    { key: "isha", label: "Isha", icon: "🌙" },
  ]

  // Convert 24-hour string (HH:mm) to 12-hour format with AM/PM
  const formatTime12Hour = (time24: string) => {
    if (!time24) return "12:00AM"
    const [hourStr, minute] = time24.split(":")
    let hour = parseInt(hourStr)
    const ampm = hour >= 12 ? "PM" : "AM"
    hour = hour % 12 || 12
    return `${hour}:${minute}${ampm}`
  }

  if (!timings || timings.length === 0)
    return <div className="text-center py-8 text-neutral-dark/60">No namaz timings available</div>

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-neutral-dark mb-4">Today's Namaz Timings</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {prayers.map((prayer) => {
          const timing = timings.find((t) => t.name === prayer.label)
          return (
            <div
              key={prayer.key}
              className="p-4 bg-neutral-light rounded-lg text-center shadow-sm hover:shadow-md transition"
            >
              <div className="text-2xl mb-2">{prayer.icon}</div>
              <p className="font-semibold text-neutral-dark">{prayer.label}</p>
              <p className="text-lg font-bold text-primary mt-2">
                {timing ? formatTime12Hour(timing.time) : "12:00AM"}
              </p>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
