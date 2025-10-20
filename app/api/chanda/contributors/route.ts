import { type NextRequest, NextResponse } from "next/server"

const contributors = [
  { id: 1, name: "Ahmed Hassan", amount: 50, date: "2025-10-18" },
  { id: 2, name: "Muhammad Ali", amount: 75, date: "2025-10-18" },
  { id: 3, name: "Fatima Khan", amount: 40, date: "2025-10-18" },
  { id: 4, name: "Hassan Ibrahim", amount: 60, date: "2025-10-18" },
]

export async function GET() {
  return NextResponse.json(contributors)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const newContributor = {
    id: Math.max(...contributors.map((c) => c.id), 0) + 1,
    ...data,
    date: new Date().toISOString().split("T")[0],
  }
  contributors.push(newContributor)
  return NextResponse.json(newContributor, { status: 201 })
}
