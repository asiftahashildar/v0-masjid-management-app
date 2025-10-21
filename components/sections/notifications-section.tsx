"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { addNotification, deleteNotification } from "@/lib/slices/notificationsSlice"

export default function NotificationsSection() {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector((state) => state.notifications.notifications)

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
  })

  const handleAddNotification = () => {
    if (!newNotification.title || !newNotification.message) {
      setError("Please fill in all fields")
      return
    }

    try {
      dispatch(
        addNotification({
          title: newNotification.title,
          message: newNotification.message,
        }),
      )
      setNewNotification({ title: "", message: "" })
      setError("")
      setSuccess("Notification sent successfully")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError("Failed to send notification")
    }
  }

  const handleDeleteNotification = (id: number) => {
    try {
      dispatch(deleteNotification(id))
      setSuccess("Notification deleted successfully")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError("Failed to delete notification")
    }
  }

  return (
    <div className="space-y-6">
      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-4 rounded-lg">{success}</div>}

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-6">Send New Notification</h3>
        <div className="space-y-4 mb-4">
          <input
            type="text"
            placeholder="Notification Title"
            value={newNotification.title}
            onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
            className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            placeholder="Notification Message"
            value={newNotification.message}
            onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
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
        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Recent Notifications ({notifications.length})</h3>
        {notifications.length === 0 ? (
          <p className="text-neutral-dark/60 text-center py-8">No notifications yet</p>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-4 bg-neutral-light rounded-lg flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-neutral-dark/60 mb-1">{notification.date}</p>
                  <p className="font-semibold text-neutral-dark">{notification.title}</p>
                  <p className="text-sm text-neutral-dark/70 mt-1">{notification.message}</p>
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
        )}
      </Card>
    </div>
  )
}
