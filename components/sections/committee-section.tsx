"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { committeeAPI } from "@/lib/api-client"

export default function CommitteeSection() {
  const [committee, setCommittee] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [leader, setLeader] = useState("")
  const [accountant, setAccountant] = useState("")

  useEffect(() => {
    loadCommittee()
  }, [])

  const loadCommittee = async () => {
    try {
      setLoading(true)
      const data = await committeeAPI.getMembers()
      setCommittee(data)
      setLeader(data.leader || "")
      setAccountant(data.accountant || "")
      setError("")
    } catch (err) {
      setError("Failed to load committee data")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateLeader = async () => {
    try {
      await committeeAPI.updateMembers({ ...committee, leader })
      await loadCommittee()
      setError("")
    } catch (err) {
      setError("Failed to update leader")
      console.error(err)
    }
  }

  const handleUpdateAccountant = async () => {
    try {
      await committeeAPI.updateMembers({ ...committee, accountant })
      await loadCommittee()
      setError("")
    } catch (err) {
      setError("Failed to update accountant")
      console.error(err)
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <div className="space-y-6">
      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-neutral-dark mb-4">Masjid Leader</h3>
          <div className="mb-4">
            <input
              type="text"
              value={leader}
              onChange={(e) => setLeader(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button
            onClick={handleUpdateLeader}
            className="bg-primary hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            Update Leader
          </Button>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-neutral-dark mb-4">Accountant</h3>
          <div className="mb-4">
            <input
              type="text"
              value={accountant}
              onChange={(e) => setAccountant(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button
            onClick={handleUpdateAccountant}
            className="bg-primary hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            Update Accountant
          </Button>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Committee Members</h3>
        <div className="space-y-3">
          {committee?.members?.map((member: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-4 bg-neutral-light rounded-lg">
              <div>
                <p className="font-semibold text-neutral-dark">{member}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
