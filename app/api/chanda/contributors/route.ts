import { type NextRequest, NextResponse } from "next/server"

const contributors: any[] = []

export async function GET() {
  return NextResponse.json(contributors)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const newContributor = {
    id: Math.max(...contributors.map((c) => c.id), 0) + 1,
    ...data,
    date: new Date().toISOString().split("T")[0],
  }
  contributors.push(newContributor)
  return NextResponse.json(newContributor, { status: 201 })
}
