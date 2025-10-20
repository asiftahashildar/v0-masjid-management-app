import { type NextRequest, NextResponse } from "next/server"

const notifications: any[] = []

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
