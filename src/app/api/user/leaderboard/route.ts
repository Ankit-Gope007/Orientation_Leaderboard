import {  NextResponse } from "next/server";
import { getTopUsers } from "@/controller/User.controller";

export async function GET() {
  try {
    const users = await getTopUsers();
    return NextResponse.json({ users });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
