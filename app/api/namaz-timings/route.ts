import { type NextRequest, NextResponse } from "next/server"

let timings = {
  fajr: "5:30 AM",
  dhuhr: "1:15 PM",
  asr: "4:45 PM",
  maghrib: "7:00 PM",
  isha: "8:30 PM",
}

export async function GET() {
  return NextResponse.json(timings)
}

export async function PUT(request: NextRequest) {
  const data = await request.json()
  timings = { ...timings, ...data }
  return NextResponse.json(timings)
}
