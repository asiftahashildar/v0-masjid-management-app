"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { chandaAPI } from "@/lib/api-client"

export default function ChandaSection() {
  const [contributors, setContributors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [allMembers, setAllMembers] = useState<string[]>([])
  const [newMemberName, setNewMemberName] = useState("")

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
      setSuccess("Contribution recorded successfully")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError("Failed to add contributor")
      console.error(err)
    }
  }

  const handleDeleteContributor = async (id: number) => {
    try {
      await chandaAPI.deleteContributor(id)
      await loadContributors()
      setSuccess("Contribution deleted successfully")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError("Failed to delete contributor")
      console.error(err)
    }
  }

  const handleAddMember = () => {
    if (!newMemberName.trim()) {
      setError("Please enter a member name")
      return
    }
    if (allMembers.includes(newMemberName)) {
      setError("Member already exists")
      return
    }
    setAllMembers([...allMembers, newMemberName])
    setNewMemberName("")
    setSuccess("Member added to tracking list")
    setTimeout(() => setSuccess(""), 3000)
  }

  const handleRemoveMember = (name: string) => {
    setAllMembers(allMembers.filter((m) => m !== name))
    setSuccess("Member removed from tracking list")
    setTimeout(() => setSuccess(""), 3000)
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  const totalChanda = contributors.reduce((sum, c) => sum + c.amount, 0)
  const contributorNames = new Set(contributors.map((c) => c.name))
  const membersWhoContributed = allMembers.filter((m) => contributorNames.has(m))
  const membersWhoHaventContributed = allMembers.filter((m) => !contributorNames.has(m))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <p className="text-neutral-dark/60 text-sm font-medium">Total Chanda Collected</p>
          <p className="text-3xl font-bold text-accent mt-2">₹{totalChanda.toLocaleString("en-IN")}</p>
          <p className="text-xs text-neutral-dark/50 mt-2">{contributors.length} contributions</p>
        </Card>

        <Card className="p-6">
          <p className="text-neutral-dark/60 text-sm font-medium">Members Contributed</p>
          <p className="text-3xl font-bold text-success mt-2">{membersWhoContributed.length}</p>
          <p className="text-xs text-neutral-dark/50 mt-2">Out of {allMembers.length} members</p>
        </Card>

        <Card className="p-6">
          <p className="text-neutral-dark/60 text-sm font-medium">Average Contribution</p>
          <p className="text-3xl font-bold text-primary mt-2">
            ₹{contributors.length > 0 ? Math.round(totalChanda / contributors.length).toLocaleString("en-IN") : "0"}
          </p>
          <p className="text-xs text-neutral-dark/50 mt-2">Per contribution</p>
        </Card>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-4 rounded-lg">{success}</div>}

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-6">Manage Members</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Member Name"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            className="px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <Button
            onClick={handleAddMember}
            className="bg-accent hover:bg-emerald-600 text-white font-medium rounded-lg transition"
          >
            Add Member
          </Button>
        </div>
      </Card>

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
            placeholder="Amount (₹)"
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
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">
          ✅ Members Who Contributed ({membersWhoContributed.length})
        </h3>
        {membersWhoContributed.length === 0 ? (
          <p className="text-neutral-dark/60 text-center py-8">No contributions yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-light">
                  <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Total Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-dark">Contributions</th>
                </tr>
              </thead>
              <tbody>
                {membersWhoContributed.map((member) => {
                  const memberContributions = contributors.filter((c) => c.name === member)
                  const totalAmount = memberContributions.reduce((sum, c) => sum + c.amount, 0)
                  return (
                    <tr key={member} className="border-b border-neutral-light hover:bg-neutral-light/50">
                      <td className="py-3 px-4 text-neutral-dark font-medium">{member}</td>
                      <td className="py-3 px-4 font-semibold text-accent">₹{totalAmount.toLocaleString("en-IN")}</td>
                      <td className="py-3 px-4 text-neutral-dark/60">{memberContributions.length}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">
          ❌ Members Who Haven't Contributed ({membersWhoHaventContributed.length})
        </h3>
        {membersWhoHaventContributed.length === 0 ? (
          <p className="text-neutral-dark/60 text-center py-8">All members have contributed!</p>
        ) : (
          <div className="space-y-2">
            {membersWhoHaventContributed.map((member) => (
              <div key={member} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="font-medium text-neutral-dark">{member}</p>
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

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">All Contributions</h3>
        {contributors.length === 0 ? (
          <p className="text-neutral-dark/60 text-center py-8">No contributions recorded yet</p>
        ) : (
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
                    <td className="py-3 px-4 font-semibold text-accent">₹{contributor.amount.toLocaleString("en-IN")}</td>
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
        )}
      </Card>
    </div>
  )
}
