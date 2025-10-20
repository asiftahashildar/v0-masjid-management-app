import { type NextRequest, NextResponse } from "next/server"

let contributors = [
  { id: 1, name: "Ahmed Hassan", amount: 50, date: "2025-10-18" },
  { id: 2, name: "Muhammad Ali", amount: 75, date: "2025-10-18" },
  { id: 3, name: "Fatima Khan", amount: 40, date: "2025-10-18" },
  { id: 4, name: "Hassan Ibrahim", amount: 60, date: "2025-10-18" },
]

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  contributors = contributors.filter((c) => c.id !== id)
  return NextResponse.json({ success: true })
}
