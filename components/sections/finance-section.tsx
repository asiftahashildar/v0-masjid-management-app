"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function FinanceSection() {
  const [expenses, setExpenses] = useState([
    { id: 1, category: "Utilities", amount: 450, date: "2025-10-15" },
    { id: 2, category: "Maintenance", amount: 300, date: "2025-10-10" },
    { id: 3, category: "Food Supplies", amount: 640, date: "2025-10-05" },
  ])

  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
  })

  const handleAddExpense = () => {
    if (newExpense.category && newExpense.amount) {
      setExpenses([
        ...expenses,
        {
          id: expenses.length + 1,
          category: newExpense.category,
          amount: Number.parseFloat(newExpense.amount),
          date: new Date().toISOString().split("T")[0],
        },
      ])
      setNewExpense({ category: "", amount: "" })
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <p className="text-neutral-dark/60 text-sm font-medium">Account Balance</p>
          <p className="text-3xl font-bold text-primary mt-2">$5,240</p>
          <p className="text-xs text-neutral-dark/50 mt-2">Last updated today</p>
        </Card>

        <Card className="p-6">
          <p className="text-neutral-dark/60 text-sm font-medium">Monthly Expenses</p>
          <p className="text-3xl font-bold text-warning mt-2">$1,390</p>
          <p className="text-xs text-neutral-dark/50 mt-2">October 2025</p>
        </Card>

        <Card className="p-6">
          <p className="text-neutral-dark/60 text-sm font-medium">Rent Due</p>
          <p className="text-3xl font-bold text-error mt-2">$800</p>
          <p className="text-xs text-neutral-dark/50 mt-2">Due on Nov 1</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-6">Add New Expense</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Category"
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            className="px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            className="px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button
            onClick={handleAddExpense}
            className="bg-primary hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            Add Expense
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Recent Expenses</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-light">
                <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} className="border-b border-neutral-light hover:bg-neutral-light/50">
                  <td className="py-3 px-4 text-neutral-dark">{expense.category}</td>
                  <td className="py-3 px-4 font-semibold text-neutral-dark">${expense.amount}</td>
                  <td className="py-3 px-4 text-neutral-dark/60">{expense.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
