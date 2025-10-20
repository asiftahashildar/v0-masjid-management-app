"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { notificationsAPI } from "@/lib/api-client"

export default function NotificationsSection() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [newNotification, setNewNotification] = useState({
    message: "",
  })

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = async () => {
    try {
      setLoading(true)
      const data = await notificationsAPI.getNotifications()
      setNotifications(data)
      setError("")
    } catch (err) {
      setError("Failed to load notifications")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddNotification = async () => {
    if (!newNotification.message) {
      setError("Please enter a message")
      return
    }

    try {
      await notificationsAPI.addNotification({
        message: newNotification.message,
      })
      setNewNotification({ message: "" })
      await loadNotifications()
      setError("")
    } catch (err) {
      setError("Failed to send notification")
      console.error(err)
    }
  }

  const handleDeleteNotification = async (id: number) => {
    try {
      await notificationsAPI.deleteNotification(id)
      await loadNotifications()
    } catch (err) {
      setError("Failed to delete notification")
      console.error(err)
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <div className="space-y-6">
      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>}

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-6">Send New Notification</h3>
        <div className="space-y-4 mb-4">
          <textarea
            placeholder="Notification Message"
            value={newNotification.message}
            onChange={(e) =>
              setNewNotification({
                ...newNotification,
                message: e.target.value,
              })
            }
            rows={3}
            className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button
            onClick={handleAddNotification}
            className="bg-primary hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition"
          >
            Send Notification
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Recent Notifications</h3>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-4 bg-neutral-light rounded-lg flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-neutral-dark/60 mb-1">{notification.date}</p>
                <p className="font-semibold text-neutral-dark">{notification.message}</p>
              </div>
              <Button
                onClick={() => handleDeleteNotification(notification.id)}
                className="bg-error hover:bg-red-600 text-white px-3 py-1 text-sm rounded-lg transition ml-4"
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
