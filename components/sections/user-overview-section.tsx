"use client"

import { Card } from "@/components/ui/card"
import { useAppSelector } from "@/lib/hooks"

export default function UserOverviewSection() {
  const committee = useAppSelector((state) => state.committee)
  const finance = useAppSelector((state) => state.finance)
  const chanda = useAppSelector((state) => state.chanda)
  const jumma = useAppSelector((state) => state.jumma)

  // 🔹 Derived Calculations
  const totalChanda = chanda.contributors.reduce((sum, c) => sum + c.amount, 0)
  const totalJummaChanda = jumma.jummaChanda.reduce((sum, j) => sum + j.amount, 0)
  const totalExpenses = finance.expenses.reduce((sum, e) => sum + e.amount, 0)
  const calculatedBalance =
    finance.totalBalance + totalChanda + totalJummaChanda - totalExpenses

  // 🔹 Loading Placeholder (optional)
  if (!committee || !finance || !chanda || !jumma)
    return <div className="text-center py-8">Loading...</div>

  return (
    <div className="space-y-6">
      {/* Committee Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-neutral-dark mb-4">Committee Overview</h3>
          <p className="text-neutral-dark/60">
            <strong>Leader:</strong> {committee.leader || "Not Assigned"}
          </p>
          <p className="text-neutral-dark/60">
            <strong>Accountant:</strong> {committee.accountant || "Not Assigned"}
          </p>
          <p className="text-neutral-dark/60 mt-2">
            <strong>Members:</strong>
          </p>
        <ul className="list-disc list-inside text-neutral-dark/70 mt-1 max-h-40 overflow-y-auto">
          {committee.members.length > 0 ? (
            committee.members.map((member) => (
              <li key={member.id}>
                {member.name} {member.role && `(${member.role})`}
              </li>
            ))
          ) : (
            <li>No members assigned</li>
          )}
        </ul>
        </Card>

        {/* Finance Overview */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-neutral-dark mb-4">Finance Overview</h3>
          <p className="text-neutral-dark/60">
            <strong>Starting Balance:</strong> ₹{finance.totalBalance.toLocaleString("en-IN")}
          </p>
          <p className="text-neutral-dark/60">
            <strong>Total Chanda:</strong> ₹{totalChanda.toLocaleString("en-IN")}
          </p>
          <p className="text-neutral-dark/60">
            <strong>Jumma Chanda:</strong> ₹{totalJummaChanda.toLocaleString("en-IN")}
          </p>
          <p className="text-neutral-dark/60">
            <strong>Total Expenses:</strong> ₹{totalExpenses.toLocaleString("en-IN")}
          </p>
          <p
            className={`text-lg font-semibold mt-3 ${
              calculatedBalance >= 0 ? "text-success" : "text-error"
            }`}
          >
            Net Balance: ₹{calculatedBalance.toLocaleString("en-IN")}
          </p>
        </Card>
      </div>

      {/* Detailed Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <p className="text-sm text-neutral-dark/60">Total Chanda</p>
          <p className="text-2xl font-bold text-primary mt-2">₹{totalChanda.toLocaleString("en-IN")}</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-neutral-dark/60">Jumma Chanda</p>
          <p className="text-2xl font-bold text-accent mt-2">₹{totalJummaChanda.toLocaleString("en-IN")}</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-neutral-dark/60">Total Expenses</p>
          <p className="text-2xl font-bold text-warning mt-2">₹{totalExpenses.toLocaleString("en-IN")}</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-neutral-dark/60">Current Balance</p>
          <p
            className={`text-2xl font-bold mt-2 ${
              calculatedBalance >= 0 ? "text-success" : "text-error"
            }`}
          >
            ₹{calculatedBalance.toLocaleString("en-IN")}
          </p>
        </Card>
      </div>
    </div>
  )
}
