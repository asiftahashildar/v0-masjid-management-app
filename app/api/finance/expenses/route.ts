import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for server-side (will be replaced with proper DB)
let expenses: any[] = []

// Initialize from localStorage if available
if (typeof window !== "undefined") {
  const stored = localStorage.getItem("masjid_expenses")
  if (stored) {
    expenses = JSON.parse(stored)
  }
}

export async function GET() {
  return NextResponse.json(expenses)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const newExpense = {
    id: expenses.length > 0 ? Math.max(...expenses.map((e) => e.id), 0) + 1 : 1,
    ...data,
    date: new Date().toISOString().split("T")[0],
  }
  expenses.push(newExpense)

  if (typeof window !== "undefined") {
    localStorage.setItem("masjid_expenses", JSON.stringify(expenses))
  }

  return NextResponse.json(newExpense, { status: 201 })
}
