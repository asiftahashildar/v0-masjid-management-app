import { type NextRequest, NextResponse } from "next/server"

let notifications: any[] = []

if (typeof window !== "undefined") {
  const stored = localStorage.getItem("masjid_notifications")
  if (stored) {
    notifications = JSON.parse(stored)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  notifications = notifications.filter((n) => n.id !== id)

  if (typeof window !== "undefined") {
    localStorage.setItem("masjid_notifications", JSON.stringify(notifications))
  }

  return NextResponse.json({ success: true })
}
