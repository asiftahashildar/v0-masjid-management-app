import { type NextRequest, NextResponse } from "next/server"

let contributors: any[] = []

if (typeof window !== "undefined") {
  const stored = localStorage.getItem("masjid_contributors")
  if (stored) {
    contributors = JSON.parse(stored)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  contributors = contributors.filter((c) => c.id !== id)

  if (typeof window !== "undefined") {
    localStorage.setItem("masjid_contributors", JSON.stringify(contributors))
  }

  return NextResponse.json({ success: true })
}
