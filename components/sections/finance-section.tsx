"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { financeAPI } from "@/lib/api-client"

export default function FinanceSection() {
  const [expenses, setExpenses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
  })

  useEffect(() => {
    loadExpenses()
  }, [])

  const loadExpenses = async () => {
    try {
      setLoading(true)
      const data = await financeAPI.getExpenses()
      setExpenses(data)
      setError("")
    } catch (err) {
      setError("Failed to load expenses")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddExpense = async () => {
    if (!newExpense.category || !newExpense.amount) {
      setError("Please fill in all fields")
      return
    }

    try {
      await financeAPI.addExpense({
        category: newExpense.category,
        amount: Number.parseFloat(newExpense.amount),
      })
      setNewExpense({ category: "", amount: "" })
      await loadExpenses()
      setError("")
    } catch (err) {
      setError("Failed to add expense")
      console.error(err)
    }
  }

  const handleDeleteExpense = async (id: number) => {
    try {
      await financeAPI.deleteExpense(id)
      await loadExpenses()
    } catch (err) {
      setError("Failed to delete expense")
      console.error(err)
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

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
          <p className="text-3xl font-bold text-warning mt-2">${expenses.reduce((sum, e) => sum + e.amount, 0)}</p>
          <p className="text-xs text-neutral-dark/50 mt-2">October 2025</p>
        </Card>

        <Card className="p-6">
          <p className="text-neutral-dark/60 text-sm font-medium">Rent Due</p>
          <p className="text-3xl font-bold text-error mt-2">$800</p>
          <p className="text-xs text-neutral-dark/50 mt-2">Due on Nov 1</p>
        </Card>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>}

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
                <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} className="border-b border-neutral-light hover:bg-neutral-light/50">
                  <td className="py-3 px-4 text-neutral-dark">{expense.category}</td>
                  <td className="py-3 px-4 font-semibold text-neutral-dark">${expense.amount}</td>
                  <td className="py-3 px-4 text-neutral-dark/60">{expense.date}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="text-error hover:text-red-700 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
