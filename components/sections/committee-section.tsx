"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setLeader, setAccountant, addMember, deleteMember } from "@/lib/slices/committeeSlice"

export default function CommitteeSection() {
  const dispatch = useAppDispatch()
  const committee = useAppSelector((state) => state.committee)

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [leader, setLeaderInput] = useState(committee.leader)
  const [accountant, setAccountantInput] = useState(committee.accountant)
  const [newMemberInput, setNewMemberInput] = useState("")

  const handleUpdateLeader = () => {
    if (!leader.trim()) {
      setError("Please enter leader name")
      return
    }
    dispatch(setLeader(leader))
    setError("")
    setSuccess("Leader updated successfully")
    setTimeout(() => setSuccess(""), 3000)
  }

  const handleUpdateAccountant = () => {
    if (!accountant.trim()) {
      setError("Please enter accountant name")
      return
    }
    dispatch(setAccountant(accountant))
    setError("")
    setSuccess("Accountant updated successfully")
    setTimeout(() => setSuccess(""), 3000)
  }

  const handleAddMember = () => {
    if (!newMemberInput.trim()) {
      setError("Please enter member name")
      return
    }
    if (committee.members.some((m) => m.name === newMemberInput)) {
      setError("Member already exists")
      return
    }
    dispatch(addMember({ name: newMemberInput, role: "Member" }))
    setNewMemberInput("")
    setError("")
    setSuccess("Member added successfully")
    setTimeout(() => setSuccess(""), 3000)
  }

  const handleRemoveMember = (id: number) => {
    dispatch(deleteMember(id))
    setSuccess("Member removed successfully")
    setTimeout(() => setSuccess(""), 3000)
  }

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
              onChange={(e) => setLeaderInput(e.target.value)}
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
              onChange={(e) => setAccountantInput(e.target.value)}
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
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Committee Members ({committee.members.length})</h3>
        {committee.members.length === 0 ? (
          <p className="text-neutral-dark/60 text-center py-8">No committee members added yet</p>
        ) : (
          <div className="space-y-3">
            {committee.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 bg-neutral-light rounded-lg border border-neutral-light"
              >
                <div>
                  <p className="font-semibold text-neutral-dark">{member.name}</p>
                  <p className="text-sm text-neutral-dark/60">{member.role}</p>
                </div>
                <button
                  onClick={() => handleRemoveMember(member.id)}
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
