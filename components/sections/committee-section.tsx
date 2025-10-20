"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { committeeAPI } from "@/lib/api-client"

export default function CommitteeSection() {
  const [committee, setCommittee] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [leader, setLeader] = useState("")
  const [accountant, setAccountant] = useState("")

  const [members, setMembers] = useState<string[]>([])
  const [newMemberInput, setNewMemberInput] = useState("")

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
      setMembers(data.members || [])
      setError("")
    } catch (err) {
      setError("Failed to load committee data")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateLeader = async () => {
    if (!leader.trim()) {
      setError("Please enter leader name")
      return
    }
    try {
      await committeeAPI.updateMembers({ ...committee, leader, members })
      await loadCommittee()
      setError("")
      setSuccess("Leader updated successfully")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError("Failed to update leader")
      console.error(err)
    }
  }

  const handleUpdateAccountant = async () => {
    if (!accountant.trim()) {
      setError("Please enter accountant name")
      return
    }
    try {
      await committeeAPI.updateMembers({ ...committee, accountant, members })
      await loadCommittee()
      setError("")
      setSuccess("Accountant updated successfully")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError("Failed to update accountant")
      console.error(err)
    }
  }

  const handleAddMember = async () => {
    if (!newMemberInput.trim()) {
      setError("Please enter member name")
      return
    }
    if (members.includes(newMemberInput)) {
      setError("Member already exists")
      return
    }
    const updatedMembers = [...members, newMemberInput]
    setMembers(updatedMembers)
    try {
      await committeeAPI.updateMembers({ ...committee, leader, accountant, members: updatedMembers })
      setNewMemberInput("")
      setError("")
      setSuccess("Member added successfully")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError("Failed to add member")
      console.error(err)
    }
  }

  const handleRemoveMember = async (memberToRemove: string) => {
    const updatedMembers = members.filter((m) => m !== memberToRemove)
    setMembers(updatedMembers)
    try {
      await committeeAPI.updateMembers({ ...committee, leader, accountant, members: updatedMembers })
      setError("")
      setSuccess("Member removed successfully")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError("Failed to remove member")
      console.error(err)
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <div className="space-y-6">
      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-4 rounded-lg">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-neutral-dark mb-4">Masjid Leader</h3>
          <div className="mb-4">
            <input
              type="text"
              value={leader}
              onChange={(e) => setLeader(e.target.value)}
              placeholder="Enter leader name"
              className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button
            onClick={handleUpdateLeader}
            className="w-full bg-primary hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition"
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
              placeholder="Enter accountant name"
              className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button
            onClick={handleUpdateAccountant}
            className="w-full bg-primary hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            Update Accountant
          </Button>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-6">Add Committee Member</h3>
        <div className="flex gap-4">
          <input
            type="text"
            value={newMemberInput}
            onChange={(e) => setNewMemberInput(e.target.value)}
            placeholder="Enter member name"
            className="flex-1 px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button
            onClick={handleAddMember}
            className="bg-accent hover:bg-emerald-600 text-white font-medium px-6 py-2 rounded-lg transition"
          >
            Add Member
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Committee Members ({members.length})</h3>
        {members.length === 0 ? (
          <p className="text-neutral-dark/60 text-center py-8">No committee members added yet</p>
        ) : (
          <div className="space-y-3">
            {members.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-neutral-light rounded-lg border border-neutral-light">
                <div>
                  <p className="font-semibold text-neutral-dark">{member}</p>
                </div>
                <button
                  onClick={() => handleRemoveMember(member)}
                  className="text-error hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
