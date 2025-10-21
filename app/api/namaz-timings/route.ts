import { type NextRequest, NextResponse } from "next/server"

let timings = {
  fajr: "",
  dhuhr: "",
  asr: "",
  maghrib: "",
  isha: "",
}

if (typeof window !== "undefined") {
  const stored = localStorage.getItem("masjid_namazTimings")
  if (stored) {
    timings = JSON.parse(stored)
  }
}

export async function GET() {
  return NextResponse.json(timings)
}

export async function PUT(request: NextRequest) {
  const data = await request.json()
  timings = { ...timings, ...data }

  if (typeof window !== "undefined") {
    localStorage.setItem("masjid_namazTimings", JSON.stringify(timings))
  }

  return NextResponse.json(timings)
}
