import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

export async function GET() {
  await dbConnect();
  const users = await User.find();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  await dbConnect();
  const { name, email, role } = await req.json();
  const newUser = new User({ name, email, role });
  await newUser.save();
  return NextResponse.json(newUser, { status: 201 });
}
