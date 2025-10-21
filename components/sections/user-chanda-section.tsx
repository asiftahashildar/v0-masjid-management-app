"use client"

import { Card } from "@/components/ui/card"
import { useAppSelector } from "@/lib/hooks"

export default function UserChandaSection() {
  const { contributors, members } = useAppSelector((state) => state.chanda)

  if (!members || members.length === 0)
    return <div className="text-center py-8 text-neutral-dark/60">No members found</div>

  const totalChanda = contributors.reduce((sum, c) => sum + c.amount, 0)

  // 🔹 Members who haven't contributed
  const nonContributors = members.filter(
    (member) => !contributors.some((c) => c.name === member)
  )

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Chanda Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-neutral-light rounded-lg">
            <p className="text-sm text-neutral-dark/60">This Week's Total</p>
            <p className="text-2xl font-bold text-accent mt-2">
              ₹{totalChanda.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="p-4 bg-neutral-light rounded-lg">
            <p className="text-sm text-neutral-dark/60">Contributors</p>
            <p className="text-2xl font-bold text-primary mt-2">{contributors.length}</p>
          </div>
          <div className="p-4 bg-neutral-light rounded-lg">
            <p className="text-sm text-neutral-dark/60">Average Contribution</p>
            <p className="text-2xl font-bold text-success mt-2">
              ₹
              {contributors.length > 0
                ? Math.round(totalChanda / contributors.length).toLocaleString("en-IN")
                : "0"}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Recent Contributors</h3>
        <div className="space-y-3">
          {contributors.length > 0 ? (
            contributors.map((contributor) => (
              <div
                key={contributor.id}
                className="flex justify-between items-center p-4 bg-neutral-light rounded-lg"
              >
                <div>
                  <p className="font-medium text-neutral-dark">{contributor.name}</p>
                  <p className="text-sm text-neutral-dark/60">{contributor.date}</p>
                </div>
                <span className="text-lg font-bold text-accent">
                  ₹{contributor.amount.toLocaleString("en-IN")}
                </span>
              </div>
            ))
          ) : (
            <p className="text-neutral-dark/60 text-center py-4">No contributions yet</p>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Members Yet to Contribute</h3>
        {nonContributors.length > 0 ? (
          <ul className="list-disc list-inside text-neutral-dark/70 mt-1 max-h-40 overflow-y-auto">
            {nonContributors.map((member) => (
              <li key={member}>{member}</li>
            ))}
          </ul>
        ) : (
          <p className="text-neutral-dark/60">All members have contributed</p>
        )}
      </Card>
    </div>
  )
}
