"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { financeAPI, chandaAPI, jummaAPI } from "@/lib/api-client"

export default function FinanceSection() {
  const [expenses, setExpenses] = useState<any[]>([])
  const [contributors, setContributors] = useState<any[]>([])
  const [jummaChanda, setJummaChanda] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [totalBalance, setTotalBalance] = useState(0)
  const [editingBalance, setEditingBalance] = useState(false)
  const [balanceInput, setBalanceInput] = useState("0")

  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [expensesData, contributorsData, jummaData] = await Promise.all([
        financeAPI.getExpenses(),
        chandaAPI.getContributors(),
        jummaAPI.getJummaChanda(),
      ])
      setExpenses(expensesData)
      setContributors(contributorsData)
      setJummaChanda(jummaData)
      setError("")
    } catch (err) {
      setError("Failed to load data")
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
      await loadData()
      setError("")
      setSuccess("Expense added successfully")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError("Failed to add expense")
      console.error(err)
    }
  }

  const handleDeleteExpense = async (id: number) => {
    try {
      await financeAPI.deleteExpense(id)
      await loadData()
      setSuccess("Expense deleted successfully")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError("Failed to delete expense")
      console.error(err)
    }
  }

  const handleUpdateBalance = async () => {
    if (!balanceInput || isNaN(Number.parseFloat(balanceInput))) {
      setError("Please enter a valid amount")
      return
    }
    setTotalBalance(Number.parseFloat(balanceInput))
    setEditingBalance(false)
    setSuccess("Account balance updated successfully")
    setTimeout(() => setSuccess(""), 3000)
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  const totalChanda = contributors.reduce((sum, c) => sum + c.amount, 0)
  const totalJummaChanda = jummaChanda.reduce((sum, j) => sum + j.amount, 0)
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
  const calculatedBalance = totalBalance + totalChanda + totalJummaChanda - totalExpenses

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-neutral-dark/60 text-sm font-medium">Starting Balance</p>
            <button
              onClick={() => {
                setEditingBalance(!editingBalance)
                setBalanceInput(totalBalance.toString())
              }}
              className="text-primary hover:text-blue-700 text-xs font-medium"
            >
              {editingBalance ? "Cancel" : "Edit"}
            </button>
          </div>
          {editingBalance ? (
            <div className="flex gap-2 mt-2">
              <input
                type="number"
                value={balanceInput}
                onChange={(e) => setBalanceInput(e.target.value)}
                className="flex-1 px-3 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                placeholder="Enter balance"
              />
              <Button
                onClick={handleUpdateBalance}
                className="bg-primary hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition"
              >
                Save
              </Button>
            </div>
          ) : (
            <p className="text-3xl font-bold text-primary mt-2">₹{totalBalance.toLocaleString("en-IN")}</p>
          )}
          <p className="text-xs text-neutral-dark/50 mt-2">Initial account balance</p>
        </Card>

        <Card className="p-6">
          <p className="text-neutral-dark/60 text-sm font-medium">Total Chanda</p>
          <p className="text-3xl font-bold text-primary mt-2">₹{totalChanda.toLocaleString("en-IN")}</p>
          <p className="text-xs text-neutral-dark/50 mt-2">{contributors.length} contributions</p>
        </Card>

        <Card className="p-6">
          <p className="text-neutral-dark/60 text-sm font-medium">Jumma Chanda</p>
          <p className="text-3xl font-bold text-accent mt-2">₹{totalJummaChanda.toLocaleString("en-IN")}</p>
          <p className="text-xs text-neutral-dark/50 mt-2">{jummaChanda.length} weeks</p>
        </Card>

        <Card className="p-6">
          <p className="text-neutral-dark/60 text-sm font-medium">Total Expenses</p>
          <p className="text-3xl font-bold text-warning mt-2">₹{totalExpenses.toLocaleString("en-IN")}</p>
          <p className="text-xs text-neutral-dark/50 mt-2">{expenses.length} transactions</p>
        </Card>

        <Card className="p-6">
          <p className="text-neutral-dark/60 text-sm font-medium">Total Balance</p>
          <p className={`text-3xl font-bold mt-2 ${calculatedBalance >= 0 ? "text-success" : "text-error"}`}>
            ₹{calculatedBalance.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-neutral-dark/50 mt-2">Balance + Chanda + Jumma - Expenses</p>
        </Card>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-4 rounded-lg">{success}</div>}

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-6">Add New Expense</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Category (e.g., Rent, Utilities)"
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            className="px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="number"
            placeholder="Amount (₹)"
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
        {expenses.length === 0 ? (
          <p className="text-neutral-dark/60 text-center py-8">No expenses recorded yet</p>
        ) : (
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
                    <td className="py-3 px-4 font-semibold text-neutral-dark">
                      ₹{expense.amount.toLocaleString("en-IN")}
                    </td>
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
        )}
      </Card>
    </div>
  )
}
