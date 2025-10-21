import { type NextRequest, NextResponse } from "next/server"

let assets: any[] = []

if (typeof window !== "undefined") {
  const stored = localStorage.getItem("masjid_assets")
  if (stored) {
    assets = JSON.parse(stored)
  }
}

export async function GET() {
  return NextResponse.json(assets)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const newAsset = {
    id: assets.length > 0 ? Math.max(...assets.map((a) => a.id), 0) + 1 : 1,
    ...data,
  }
  assets.push(newAsset)

  if (typeof window !== "undefined") {
    localStorage.setItem("masjid_assets", JSON.stringify(assets))
  }

  return NextResponse.json(newAsset, { status: 201 })
}
