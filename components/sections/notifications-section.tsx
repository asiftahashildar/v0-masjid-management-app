"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function NotificationsSection() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Jummah Prayer Reminder",
      message: "Jummah prayer starts at 1:30 PM tomorrow",
      date: "2025-10-18",
    },
    {
      id: 2,
      title: "Chanda Collection",
      message: "Weekly chanda collection this Friday",
      date: "2025-10-17",
    },
    {
      id: 3,
      title: "Maintenance Notice",
      message: "Masjid maintenance scheduled for next week",
      date: "2025-10-16",
    },
  ])

  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
  })

  const handleAddNotification = () => {
    if (newNotification.title && newNotification.message) {
      setNotifications([
        ...notifications,
        {
          id: notifications.length + 1,
          title: newNotification.title,
          message: newNotification.message,
          date: new Date().toISOString().split("T")[0],
        },
      ])
      setNewNotification({ title: "", message: "" })
    }
  }

  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  return (
    <div className="space-y-6">
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
                <p className="font-semibold text-neutral-dark">{notification.title}</p>
                <p className="text-sm text-neutral-dark/60 mt-1">{notification.message}</p>
                <p className="text-xs text-neutral-dark/50 mt-2">{notification.date}</p>
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
