"use client"

import { Card } from "@/components/ui/card"
import { useAppSelector } from "@/lib/hooks"

export default function UserNotificationsSection() {
  const notifications = useAppSelector((state) => state.notifications.notifications)

  if (!notifications || notifications.length === 0)
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Notifications</h3>
        <p className="text-neutral-dark/60 text-center py-8">No notifications yet</p>
      </Card>
    )

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-neutral-dark mb-4">
        Notifications ({notifications.length})
      </h3>
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
          >
            <p className="font-medium text-neutral-dark">{notification.message}</p>
            <p className="text-sm text-neutral-dark/60 mt-1">{notification.date}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
