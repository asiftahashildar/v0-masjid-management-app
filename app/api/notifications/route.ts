import { type NextRequest, NextResponse } from "next/server"

let notifications: any[] = []

if (typeof window !== "undefined") {
  const stored = localStorage.getItem("masjid_notifications")
  if (stored) {
    notifications = JSON.parse(stored)
  }
}

export async function GET() {
  return NextResponse.json(notifications)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const newNotification = {
    id: notifications.length > 0 ? Math.max(...notifications.map((n) => n.id), 0) + 1 : 1,
    ...data,
    date: new Date().toISOString().split("T")[0],
  }
  notifications.push(newNotification)

  if (typeof window !== "undefined") {
    localStorage.setItem("masjid_notifications", JSON.stringify(notifications))
  }

  return NextResponse.json(newNotification, { status: 201 })
}
