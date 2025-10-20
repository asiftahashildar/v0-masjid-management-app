import { type NextRequest, NextResponse } from "next/server"

let committee = {
  leader: "Sheikh Muhammad Hassan",
  accountant: "Ahmed Khan",
  members: ["Fatima Khan", "Hassan Ibrahim", "Aisha Ahmed"],
}

export async function GET() {
  return NextResponse.json(committee)
}

export async function PUT(request: NextRequest) {
  const data = await request.json()
  committee = { ...committee, ...data }
  return NextResponse.json(committee)
}
