import { type NextRequest, NextResponse } from "next/server"

let expenses = [
  { id: 1, category: "Utilities", amount: 450, date: "2025-10-15" },
  { id: 2, category: "Maintenance", amount: 300, date: "2025-10-10" },
  { id: 3, category: "Food Supplies", amount: 640, date: "2025-10-05" },
]

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  expenses = expenses.filter((e) => e.id !== id)
  return NextResponse.json({ success: true })
}
