"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { addJummaChanda, deleteJummaChanda } from "@/lib/slices/jummaSlice"

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function JummaChanda() {
  const dispatch = useAppDispatch()
  const jummaChanda = useAppSelector((state) => state.jumma.jummaChanda)

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [newJumma, setNewJumma] = useState({
    amount: "",
    week: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  })

  const handleAddJummaChanda = () => {
    if (!newJumma.amount || !newJumma.week) {
      setError("Please fill in all fields")
      return
    }

    try {
      dispatch(
        addJummaChanda({
          week: Number.parseInt(newJumma.week),
          month: monthNames[newJumma.month - 1],
          year: newJumma.year,
          amount: Number.parseFloat(newJumma.amount),
        }),
      )
      setNewJumma({
        amount: "",
        week: "",
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      })
      setError("")
      setSuccess("Jumma Chanda recorded successfully")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError("Failed to add Jumma Chanda")
    }
  }

  const handleDeleteJummaChanda = (id: number) => {
    try {
      dispatch(deleteJummaChanda(id))
      setSuccess("Jumma Chanda deleted successfully")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError("Failed to delete Jumma Chanda")
    }
  }

  const totalJummaChanda = jummaChanda.reduce((sum, j) => sum + j.amount, 0)

  // Group by month and year
  const groupedByMonth = jummaChanda.reduce(
    (acc, item) => {
      const key = `${item.month}-${item.year}`
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(item)
      return acc
    },
    {} as Record<string, any[]>,
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <p className="text-neutral-dark/60 text-sm font-medium">Total Jumma Chanda</p>
          <p className="text-3xl font-bold text-accent mt-2">₹{totalJummaChanda.toLocaleString("en-IN")}</p>
          <p className="text-xs text-neutral-dark/50 mt-2">{jummaChanda.length} weeks recorded</p>
        </Card>

        <Card className="p-6">
          <p className="text-neutral-dark/60 text-sm font-medium">Average Weekly Chanda</p>
          <p className="text-3xl font-bold text-primary mt-2">
            ₹{jummaChanda.length > 0 ? Math.round(totalJummaChanda / jummaChanda.length).toLocaleString("en-IN") : "0"}
          </p>
          <p className="text-xs text-neutral-dark/50 mt-2">Per Friday</p>
        </Card>

        <Card className="p-6">
          <p className="text-neutral-dark/60 text-sm font-medium">Highest Weekly Collection</p>
          <p className="text-3xl font-bold text-success mt-2">
            ₹{jummaChanda.length > 0 ? Math.max(...jummaChanda.map((j) => j.amount)).toLocaleString("en-IN") : "0"}
          </p>
          <p className="text-xs text-neutral-dark/50 mt-2">Best week</p>
        </Card>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-4 rounded-lg">{success}</div>}

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-6">Record Weekly Jumma Chanda</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <input
            type="number"
            placeholder="Week Number (1-4)"
            value={newJumma.week}
            onChange={(e) => setNewJumma({ ...newJumma, week: e.target.value })}
            className="px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            min="1"
            max="4"
          />
          <select
            value={newJumma.month}
            onChange={(e) => setNewJumma({ ...newJumma, month: Number.parseInt(e.target.value) })}
            className="px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {monthNames.map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Year"
            value={newJumma.year}
            onChange={(e) => setNewJumma({ ...newJumma, year: Number.parseInt(e.target.value) })}
            className="px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="number"
            placeholder="Amount (₹)"
            value={newJumma.amount}
            onChange={(e) => setNewJumma({ ...newJumma, amount: e.target.value })}
            className="px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <Button
            onClick={handleAddJummaChanda}
            className="bg-accent hover:bg-emerald-600 text-white font-medium rounded-lg transition"
          >
            Add
          </Button>
        </div>
      </Card>

      {Object.entries(groupedByMonth)
        .sort(([keyA], [keyB]) => {
          const [monthA, yearA] = keyA.split("-")
          const [monthB, yearB] = keyB.split("-")
          return Number(yearB) - Number(yearA) || monthNames.indexOf(monthB) - monthNames.indexOf(monthA)
        })
        .map(([key, items]) => {
          const [month, year] = key.split("-")
          const monthTotal = items.reduce((sum, item) => sum + item.amount, 0)

          return (
            <Card key={key} className="p-6">
              <h3 className="text-lg font-semibold text-neutral-dark mb-4">
                {month} {year} - Total: ₹{monthTotal.toLocaleString("en-IN")}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-light">
                      <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Week</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b border-neutral-light hover:bg-neutral-light/50">
                        <td className="py-3 px-4 text-neutral-dark font-medium">Week {item.week}</td>
                        <td className="py-3 px-4 font-semibold text-accent">₹{item.amount.toLocaleString("en-IN")}</td>
                        <td className="py-3 px-4 text-neutral-dark/60">{item.date}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleDeleteJummaChanda(item.id)}
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
          )
        })}
    </div>
  )
}
