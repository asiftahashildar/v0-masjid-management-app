import { type NextRequest, NextResponse } from "next/server"

let committee = {
  leader: "",
  accountant: "",
  members: [],
}

if (typeof window !== "undefined") {
  const stored = localStorage.getItem("masjid_committee")
  if (stored) {
    committee = JSON.parse(stored)
  }
}

export async function GET() {
  return NextResponse.json(committee)
}

export async function PUT(request: NextRequest) {
  const data = await request.json()
  committee = { ...committee, ...data }

  if (typeof window !== "undefined") {
    localStorage.setItem("masjid_committee", JSON.stringify(committee))
  }

  return NextResponse.json(committee)
}
