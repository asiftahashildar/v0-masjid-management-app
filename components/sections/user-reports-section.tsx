"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { financeAPI, chandaAPI, assetsAPI } from "@/lib/api-client"

export default function UserReportsSection() {
  const [expenses, setExpenses] = useState<any[]>([])
  const [contributors, setContributors] = useState<any[]>([])
  const [assets, setAssets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadReportData()
  }, [])

  const loadReportData = async () => {
    try {
      setLoading(true)
      const [expensesData, contributorsData, assetsData] = await Promise.all([
        financeAPI.getExpenses(),
        chandaAPI.getContributors(),
        assetsAPI.getAssets(),
      ])
      setExpenses(expensesData)
      setContributors(contributorsData)
      setAssets(assetsData)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
  const totalChanda = contributors.reduce((sum, c) => sum + c.amount, 0)
  const balance = 5240 + totalChanda - totalExpenses

  const expensesByCategory = expenses.reduce((acc: any, exp: any) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount
    return acc
  }, {})

  const assetsByCategory = assets.reduce((acc: any, asset: any) => {
    acc[asset.category] = (acc[asset.category] || 0) + asset.quantity
    return acc
  }, {})

  return (
    <div className="space-y-6">
      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <p className="text-neutral-dark/60 text-sm font-medium">Account Balance</p>
          <p className="text-3xl font-bold text-primary mt-2">${balance.toFixed(2)}</p>
          <p className="text-xs text-neutral-dark/50 mt-2">Current balance</p>
        </Card>

        <Card className="p-6">
          <p className="text-neutral-dark/60 text-sm font-medium">Total Chanda</p>
          <p className="text-3xl font-bold text-accent mt-2">${totalChanda}</p>
          <p className="text-xs text-neutral-dark/50 mt-2">{contributors.length} contributors</p>
        </Card>

        <Card className="p-6">
          <p className="text-neutral-dark/60 text-sm font-medium">Total Expenses</p>
          <p className="text-3xl font-bold text-warning mt-2">${totalExpenses}</p>
          <p className="text-xs text-neutral-dark/50 mt-2">{expenses.length} transactions</p>
        </Card>

        <Card className="p-6">
          <p className="text-neutral-dark/60 text-sm font-medium">Total Assets</p>
          <p className="text-3xl font-bold text-success mt-2">{assets.length}</p>
          <p className="text-xs text-neutral-dark/50 mt-2">items tracked</p>
        </Card>
      </div>

      {/* Expenses by Category */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Expenses by Category</h3>
        <div className="space-y-3">
          {Object.entries(expensesByCategory).map(([category, amount]: [string, any]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="text-neutral-dark">{category}</span>
              <div className="flex items-center gap-4">
                <div className="w-32 bg-neutral-light rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${(amount / totalExpenses) * 100}%` }}
                  />
                </div>
                <span className="font-semibold text-neutral-dark w-16 text-right">${amount}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Assets by Category */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Assets by Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(assetsByCategory).map(([category, quantity]: [string, any]) => (
            <div key={category} className="p-4 bg-neutral-light rounded-lg">
              <p className="text-neutral-dark/60 text-sm">{category}</p>
              <p className="text-2xl font-bold text-primary mt-2">{quantity}</p>
              <p className="text-xs text-neutral-dark/50 mt-1">items</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-light">
                <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Description</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.slice(0, 5).map((expense) => (
                <tr key={expense.id} className="border-b border-neutral-light hover:bg-neutral-light/50">
                  <td className="py-3 px-4 text-neutral-dark">Expense</td>
                  <td className="py-3 px-4 text-neutral-dark">{expense.category}</td>
                  <td className="py-3 px-4 font-semibold text-warning">-${expense.amount}</td>
                  <td className="py-3 px-4 text-neutral-dark/60">{expense.date}</td>
                </tr>
              ))}
              {contributors.slice(0, 5).map((contributor) => (
                <tr
                  key={`chanda-${contributor.id}`}
                  className="border-b border-neutral-light hover:bg-neutral-light/50"
                >
                  <td className="py-3 px-4 text-neutral-dark">Chanda</td>
                  <td className="py-3 px-4 text-neutral-dark">{contributor.name}</td>
                  <td className="py-3 px-4 font-semibold text-accent">+${contributor.amount}</td>
                  <td className="py-3 px-4 text-neutral-dark/60">{contributor.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
