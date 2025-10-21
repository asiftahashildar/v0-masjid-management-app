import { type NextRequest, NextResponse } from "next/server"

let contributors: any[] = []

if (typeof window !== "undefined") {
  const stored = localStorage.getItem("masjid_contributors")
  if (stored) {
    contributors = JSON.parse(stored)
  }
}

export async function GET() {
  return NextResponse.json(contributors)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const newContributor = {
    id: contributors.length > 0 ? Math.max(...contributors.map((c) => c.id), 0) + 1 : 1,
    ...data,
    date: new Date().toISOString().split("T")[0],
  }
  contributors.push(newContributor)

  if (typeof window !== "undefined") {
    localStorage.setItem("masjid_contributors", JSON.stringify(contributors))
  }

  return NextResponse.json(newContributor, { status: 201 })
}
