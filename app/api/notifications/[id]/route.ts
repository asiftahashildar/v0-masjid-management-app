import { type NextRequest, NextResponse } from "next/server"

let notifications = [
  { id: 1, message: "Jummah prayer at 1:30 PM", date: "2025-10-18" },
  { id: 2, message: "Maintenance work scheduled for Sunday", date: "2025-10-17" },
]

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  notifications = notifications.filter((n) => n.id !== id)
  return NextResponse.json({ success: true })
}
