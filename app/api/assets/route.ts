import { type NextRequest, NextResponse } from "next/server"

const assets: any[] = []

export async function GET() {
  return NextResponse.json(assets)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const newAsset = {
    id: Math.max(...assets.map((a) => a.id), 0) + 1,
    ...data,
  }
  assets.push(newAsset)
  return NextResponse.json(newAsset, { status: 201 })
}
