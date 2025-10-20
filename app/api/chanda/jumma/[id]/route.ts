import { type NextRequest, NextResponse } from "next/server"

let jummaChanda: any[] = []

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  jummaChanda = jummaChanda.filter((j) => j.id !== id)
  return NextResponse.json({ success: true })
}
