import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  // Extract the updated user data from the request body
  const { name, email, role } = await req.json();

  // Find and update the user by ID
  const updatedUser = await User.findByIdAndUpdate(
    params.id,
    { name, email, role },
    { new: true } // Return the updated user document
  );

  if (!updatedUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(updatedUser); // Return the updated user in the response
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const deletedUser = await User.findByIdAndDelete(params.id);
  if (!deletedUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "User deleted" });
}
