"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { committeeAPI, financeAPI, chandaAPI, jummaAPI } from "@/lib/api-client"

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
      const [committeeData, expensesData, contributorsData, jummaData] = await Promise.all([
        committeeAPI.getMembers(),
        financeAPI.getExpenses(),
        chandaAPI.getContributors(),
        jummaAPI.getJummaChanda(),
      ])

      setCommittee(committeeData)
      const totalChanda = contributorsData.reduce((sum: number, c: any) => sum + c.amount, 0)
      const totalJummaChanda = jummaData.reduce((sum: number, j: any) => sum + j.amount, 0)
      const totalExpenses = expensesData.reduce((sum: number, e: any) => sum + e.amount, 0)

      const balance = 0 + totalChanda + totalJummaChanda - totalExpenses

      setStats({
        balance,
        totalChanda,
        totalJummaChanda,
        expenses: totalExpenses,
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-neutral-dark mb-4">Masjid Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-neutral-dark/60">Leader</p>
              <p className="font-medium text-neutral-dark">{committee?.leader || "Not assigned"}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-dark/60">Accountant</p>
              <p className="font-medium text-neutral-dark">{committee?.accountant || "Not assigned"}</p>
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
              <span className={`font-semibold ${stats?.balance >= 0 ? "text-success" : "text-error"}`}>
                ₹{stats?.balance?.toLocaleString("en-IN") || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-dark/60">Total Chanda</span>
              <span className="font-semibold text-primary">₹{stats?.totalChanda?.toLocaleString("en-IN") || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-dark/60">Jumma Chanda</span>
              <span className="font-semibold text-accent">
                ₹{stats?.totalJummaChanda?.toLocaleString("en-IN") || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-dark/60">Total Expenses</span>
              <span className="font-semibold text-warning">₹{stats?.expenses?.toLocaleString("en-IN") || 0}</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Committee Members</h3>
        {committee?.members && committee.members.length > 0 ? (
          <div className="space-y-3">
            {committee.members.map((member: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-neutral-light rounded-lg">
                <div>
                  <p className="font-medium text-neutral-dark">{member.name}</p>
                  <p className="text-sm text-neutral-dark/60">{member.role}</p>
                </div>
                <div className="text-2xl">{member.icon || "👤"}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-dark/60 text-center py-8">No committee members added yet</p>
        )}
      </Card>
    </div>
  )
}
