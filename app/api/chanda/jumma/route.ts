import { type NextRequest, NextResponse } from "next/server"

let jummaChanda: any[] = []

if (typeof window !== "undefined") {
  const stored = localStorage.getItem("masjid_jummaChanda")
  if (stored) {
    jummaChanda = JSON.parse(stored)
  }
}

export async function GET() {
  return NextResponse.json(jummaChanda)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const newJummaChanda = {
    id: jummaChanda.length > 0 ? Math.max(...jummaChanda.map((j) => j.id), 0) + 1 : 1,
    ...data,
    date: new Date().toISOString().split("T")[0],
  }
  jummaChanda.push(newJummaChanda)

  if (typeof window !== "undefined") {
    localStorage.setItem("masjid_jummaChanda", JSON.stringify(jummaChanda))
  }

  return NextResponse.json(newJummaChanda, { status: 201 })
}
