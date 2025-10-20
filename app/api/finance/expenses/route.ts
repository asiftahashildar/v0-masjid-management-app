import { type NextRequest, NextResponse } from "next/server"

// In-memory storage (replace with database in production)
const expenses = [
  { id: 1, category: "Utilities", amount: 450, date: "2025-10-15" },
  { id: 2, category: "Maintenance", amount: 300, date: "2025-10-10" },
  { id: 3, category: "Food Supplies", amount: 640, date: "2025-10-05" },
]

export async function GET() {
  return NextResponse.json(expenses)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const newExpense = {
    id: Math.max(...expenses.map((e) => e.id), 0) + 1,
    ...data,
    date: new Date().toISOString().split("T")[0],
  }
  expenses.push(newExpense)
  return NextResponse.json(newExpense, { status: 201 })
}
