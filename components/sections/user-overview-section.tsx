"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { committeeAPI, financeAPI, chandaAPI } from "@/lib/api-client"

export default function UserOverviewSection() {
  const [committee, setCommittee] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [committeeData, expensesData, contributorsData] = await Promise.all([
        committeeAPI.getMembers(),
        financeAPI.getExpenses(),
        chandaAPI.getContributors(),
      ])

      setCommittee(committeeData)
      const totalChanda = contributorsData.reduce((sum: number, c: any) => sum + c.amount, 0)
      setStats({
        balance: 5240,
        totalChanda,
        expenses: expensesData.reduce((sum: number, e: any) => sum + e.amount, 0),
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Masjid Information</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-neutral-dark/60">Leader</p>
            <p className="font-medium text-neutral-dark">{committee?.leader || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-neutral-dark/60">Accountant</p>
            <p className="font-medium text-neutral-dark">{committee?.accountant || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-neutral-dark/60">Total Members</p>
            <p className="font-medium text-neutral-dark">{committee?.members?.length || 0}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Quick Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-neutral-dark/60">Account Balance</span>
            <span className="font-semibold text-accent">${stats?.balance || 0}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-dark/60">Total Chanda</span>
            <span className="font-semibold text-primary">${stats?.totalChanda || 0}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-dark/60">Total Expenses</span>
            <span className="font-semibold text-warning">${stats?.expenses || 0}</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
