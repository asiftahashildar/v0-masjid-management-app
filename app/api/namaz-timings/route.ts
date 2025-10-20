import { type NextRequest, NextResponse } from "next/server"

let timings = {
  fajr: "",
  dhuhr: "",
  asr: "",
  maghrib: "",
  isha: "",
}

export async function GET() {
  return NextResponse.json(timings)
}

export async function PUT(request: NextRequest) {
  const data = await request.json()
  timings = { ...timings, ...data }
  return NextResponse.json(timings)
}
