"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AssetsSection() {
  const [assets, setAssets] = useState([
    { id: 1, name: "Large Cooking Pots", quantity: 5, category: "Kitchen" },
    { id: 2, name: "Plates", quantity: 200, category: "Kitchen" },
    { id: 3, name: "Glasses", quantity: 150, category: "Kitchen" },
    { id: 4, name: "Prayer Mats", quantity: 80, category: "Prayer" },
    { id: 5, name: "Qurans", quantity: 25, category: "Religious" },
  ])

  const [newAsset, setNewAsset] = useState({
    name: "",
    quantity: "",
    category: "",
  })

  const handleAddAsset = () => {
    if (newAsset.name && newAsset.quantity && newAsset.category) {
      setAssets([
        ...assets,
        {
          id: assets.length + 1,
          name: newAsset.name,
          quantity: Number.parseInt(newAsset.quantity),
          category: newAsset.category,
        },
      ])
      setNewAsset({ name: "", quantity: "", category: "" })
    }
  }

  const handleDeleteAsset = (id: number) => {
    setAssets(assets.filter((asset) => asset.id !== id))
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-dark mb-6">Add New Asset</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Asset Name"
            value={newAsset.name}
            onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
            className="px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newAsset.quantity}
            onChange={(e) => setNewAsset({ ...newAsset, quantity: e.target.value })}
            className="px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={newAsset.category}
            onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value })}
            className="px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Category</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Prayer">Prayer</option>
            <option value="Religious">Religious</option>
            <option value="Other">Other</option>
          </select>
          <Button
            onClick={handleAddAsset}
            className="bg-primary hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            Add Asset
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assets.map((asset) => (
          <Card key={asset.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-semibold text-neutral-dark">{asset.name}</h4>
                <p className="text-sm text-neutral-dark/60 mt-1">{asset.category}</p>
              </div>
              <Button
                onClick={() => handleDeleteAsset(asset.id)}
                className="bg-error hover:bg-red-600 text-white px-3 py-1 text-sm rounded-lg transition"
              >
                Delete
              </Button>
            </div>
            <div className="text-3xl font-bold text-primary">{asset.quantity}</div>
            <p className="text-sm text-neutral-dark/60 mt-2">items in stock</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
