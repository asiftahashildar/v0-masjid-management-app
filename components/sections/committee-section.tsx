"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CommitteeSection() {
  const [leader, setLeader] = useState("Sheikh Ahmed Hassan")
  const [accountant, setAccountant] = useState("Muhammad Ali")
  const [members, setMembers] = useState([
    { id: 1, name: "Hassan Ibrahim", role: "Vice Leader" },
    { id: 2, name: "Fatima Khan", role: "Secretary" },
    { id: 3, name: "Omar Ahmed", role: "Treasurer" },
    { id: 4, name: "Aisha Mohammed", role: "Member" },
  ])

  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
  })

  const handleAddMember = () => {
    if (newMember.name && newMember.role) {
      setMembers([
        ...members,
        {
          id: members.length + 1,
          name: newMember.name,
          role: newMember.role,
        },
      ])
      setNewMember({ name: "", role: "" })
    }
  }

  const handleDeleteMember = (id: number) => {
    setMembers(members.filter((member) => member.id !== id))
  }

  return (
    <div className="space-y-6">
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
          <Button className="bg-primary hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition">
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
          <Button className="bg-primary hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition">
            Update Accountant
          </Button>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-6">Add Committee Member</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Member Name"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            className="px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="Role"
            value={newMember.role}
            onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
            className="px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button
            onClick={handleAddMember}
            className="bg-primary hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            Add Member
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Committee Members</h3>
        <div className="space-y-3">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 bg-neutral-light rounded-lg">
              <div>
                <p className="font-semibold text-neutral-dark">{member.name}</p>
                <p className="text-sm text-neutral-dark/60">{member.role}</p>
              </div>
              <Button
                onClick={() => handleDeleteMember(member.id)}
                className="bg-error hover:bg-red-600 text-white px-3 py-1 text-sm rounded-lg transition"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
