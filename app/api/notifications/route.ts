import { type NextRequest, NextResponse } from "next/server"

const notifications = [
  { id: 1, message: "Jummah prayer at 1:30 PM", date: "2025-10-18" },
  { id: 2, message: "Maintenance work scheduled for Sunday", date: "2025-10-17" },
]

export async function GET() {
  return NextResponse.json(notifications)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const newNotification = {
    id: Math.max(...notifications.map((n) => n.id), 0) + 1,
    ...data,
    date: new Date().toISOString().split("T")[0],
  }
  notifications.push(newNotification)
  return NextResponse.json(newNotification, { status: 201 })
}
