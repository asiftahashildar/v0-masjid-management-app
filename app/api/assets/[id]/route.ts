import { type NextRequest, NextResponse } from "next/server"

let assets: any[] = []

if (typeof window !== "undefined") {
  const stored = localStorage.getItem("masjid_assets")
  if (stored) {
    assets = JSON.parse(stored)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const data = await request.json()
  const index = assets.findIndex((a) => a.id === id)
  if (index !== -1) {
    assets[index] = { ...assets[index], ...data }

    if (typeof window !== "undefined") {
      localStorage.setItem("masjid_assets", JSON.stringify(assets))
    }

    return NextResponse.json(assets[index])
  }
  return NextResponse.json({ error: "Not found" }, { status: 404 })
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  assets = assets.filter((a) => a.id !== id)

  if (typeof window !== "undefined") {
    localStorage.setItem("masjid_assets", JSON.stringify(assets))
  }

  return NextResponse.json({ success: true })
}
