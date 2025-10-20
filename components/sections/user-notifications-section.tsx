"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { notificationsAPI } from "@/lib/api-client"

export default function UserNotificationsSection() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = async () => {
    try {
      setLoading(true)
      const data = await notificationsAPI.getNotifications()
      setNotifications(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-neutral-dark mb-4">Notifications</h3>
      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-medium text-neutral-dark">{notification.message}</p>
              <p className="text-sm text-neutral-dark/60 mt-1">{notification.date}</p>
            </div>
          ))
        ) : (
          <p className="text-neutral-dark/60 text-center py-8">No notifications yet</p>
        )}
      </div>
    </Card>
  )
}
