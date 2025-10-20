import { type NextRequest, NextResponse } from "next/server"

let assets = [
  { id: 1, name: "Prayer Mats", quantity: 150, condition: "Good" },
  { id: 2, name: "Qurans", quantity: 45, condition: "Good" },
  { id: 3, name: "Carpets", quantity: 8, condition: "Fair" },
]

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const data = await request.json()
  const index = assets.findIndex((a) => a.id === id)
  if (index !== -1) {
    assets[index] = { ...assets[index], ...data }
    return NextResponse.json(assets[index])
  }
  return NextResponse.json({ error: "Not found" }, { status: 404 })
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  assets = assets.filter((a) => a.id !== id)
  return NextResponse.json({ success: true })
}
