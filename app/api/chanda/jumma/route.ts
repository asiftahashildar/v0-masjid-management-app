import { type NextRequest, NextResponse } from "next/server"

const jummaChanda: any[] = []

export async function GET() {
  return NextResponse.json(jummaChanda)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const newJummaChanda = {
    id: Math.max(...jummaChanda.map((j) => j.id), 0) + 1,
    ...data,
    date: new Date().toISOString().split("T")[0],
  }
  jummaChanda.push(newJummaChanda)
  return NextResponse.json(newJummaChanda, { status: 201 })
}
