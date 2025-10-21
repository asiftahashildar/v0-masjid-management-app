import { type NextRequest, NextResponse } from "next/server"

let jummaChanda: any[] = []

if (typeof window !== "undefined") {
  const stored = localStorage.getItem("masjid_jummaChanda")
  if (stored) {
    jummaChanda = JSON.parse(stored)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  jummaChanda = jummaChanda.filter((j) => j.id !== id)

  if (typeof window !== "undefined") {
    localStorage.setItem("masjid_jummaChanda", JSON.stringify(jummaChanda))
  }

  return NextResponse.json({ success: true })
}
