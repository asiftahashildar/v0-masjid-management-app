"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { chandaAPI } from "@/lib/api-client"

export default function UserChandaSection() {
  const [contributors, setContributors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadContributors()
  }, [])

  const loadContributors = async () => {
    try {
      setLoading(true)
      const data = await chandaAPI.getContributors()
      setContributors(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  const totalChanda = contributors.reduce((sum, c) => sum + c.amount, 0)

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Chanda Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-neutral-light rounded-lg">
            <p className="text-sm text-neutral-dark/60">This Week's Total</p>
            <p className="text-2xl font-bold text-accent mt-2">${totalChanda}</p>
          </div>
          <div className="p-4 bg-neutral-light rounded-lg">
            <p className="text-sm text-neutral-dark/60">Contributors</p>
            <p className="text-2xl font-bold text-primary mt-2">{contributors.length}</p>
          </div>
          <div className="p-4 bg-neutral-light rounded-lg">
            <p className="text-sm text-neutral-dark/60">Average Contribution</p>
            <p className="text-2xl font-bold text-success mt-2">
              ${contributors.length > 0 ? (totalChanda / contributors.length).toFixed(2) : 0}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Recent Contributors</h3>
        <div className="space-y-3">
          {contributors.map((contributor) => (
            <div key={contributor.id} className="flex justify-between items-center p-4 bg-neutral-light rounded-lg">
              <div>
                <p className="font-medium text-neutral-dark">{contributor.name}</p>
                <p className="text-sm text-neutral-dark/60">{contributor.date}</p>
              </div>
              <span className="text-lg font-bold text-accent">${contributor.amount}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
