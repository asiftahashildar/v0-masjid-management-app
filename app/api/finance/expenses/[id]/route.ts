import { type NextRequest, NextResponse } from "next/server"

let expenses: any[] = []

if (typeof window !== "undefined") {
  const stored = localStorage.getItem("masjid_expenses")
  if (stored) {
    expenses = JSON.parse(stored)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  expenses = expenses.filter((e) => e.id !== id)

  if (typeof window !== "undefined") {
    localStorage.setItem("masjid_expenses", JSON.stringify(expenses))
  }

  return NextResponse.json({ success: true })
}
