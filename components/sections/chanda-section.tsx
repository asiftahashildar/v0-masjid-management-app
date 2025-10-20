"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { chandaAPI } from "@/lib/api-client"

export default function ChandaSection() {
  const [contributors, setContributors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [newContributor, setNewContributor] = useState({
    name: "",
    amount: "",
  })

  useEffect(() => {
    loadContributors()
  }, [])

  const loadContributors = async () => {
    try {
      setLoading(true)
      const data = await chandaAPI.getContributors()
      setContributors(data)
      setError("")
    } catch (err) {
      setError("Failed to load contributors")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddContributor = async () => {
    if (!newContributor.name || !newContributor.amount) {
      setError("Please fill in all fields")
      return
    }

    try {
      await chandaAPI.addContributor({
        name: newContributor.name,
        amount: Number.parseFloat(newContributor.amount),
      })
      setNewContributor({ name: "", amount: "" })
      await loadContributors()
      setError("")
    } catch (err) {
      setError("Failed to add contributor")
      console.error(err)
    }
  }

  const handleDeleteContributor = async (id: number) => {
    try {
      await chandaAPI.deleteContributor(id)
      await loadContributors()
    } catch (err) {
      setError("Failed to delete contributor")
      console.error(err)
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  const totalChanda = contributors.reduce((sum, c) => sum + c.amount, 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <p className="text-neutral-dark/60 text-sm font-medium">This Week's Chanda</p>
          <p className="text-3xl font-bold text-accent mt-2">${totalChanda}</p>
          <p className="text-xs text-neutral-dark/50 mt-2">{contributors.length} contributors</p>
        </Card>

        <Card className="p-6">
          <p className="text-neutral-dark/60 text-sm font-medium">Monthly Total</p>
          <p className="text-3xl font-bold text-primary mt-2">$1,850</p>
          <p className="text-xs text-neutral-dark/50 mt-2">October 2025</p>
        </Card>

        <Card className="p-6">
          <p className="text-neutral-dark/60 text-sm font-medium">Yearly Total</p>
          <p className="text-3xl font-bold text-success mt-2">$18,500</p>
          <p className="text-xs text-neutral-dark/50 mt-2">2025</p>
        </Card>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>}

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-6">Record Chanda Contribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Contributor Name"
            value={newContributor.name}
            onChange={(e) => setNewContributor({ ...newContributor, name: e.target.value })}
            className="px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newContributor.amount}
            onChange={(e) => setNewContributor({ ...newContributor, amount: e.target.value })}
            className="px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <Button
            onClick={handleAddContributor}
            className="bg-accent hover:bg-emerald-600 text-white font-medium rounded-lg transition"
          >
            Add Contribution
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Contributors This Week</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-light">
                <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Action</th>
              </tr>
            </thead>
            <tbody>
              {contributors.map((contributor) => (
                <tr key={contributor.id} className="border-b border-neutral-light hover:bg-neutral-light/50">
                  <td className="py-3 px-4 text-neutral-dark">{contributor.name}</td>
                  <td className="py-3 px-4 font-semibold text-accent">${contributor.amount}</td>
                  <td className="py-3 px-4 text-neutral-dark/60">{contributor.date}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDeleteContributor(contributor.id)}
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
