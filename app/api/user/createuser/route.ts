import { NextResponse, NextRequest } from "next/server";
import { hash } from "bcryptjs";
import UserModel from "@/models/UserModel";
import { connectToDb } from "@/utils/connectToDb";

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

  await connectToDb();

  if (!name || !email || !password) {
    return NextResponse.json({
      msg: "Please fill in all fields",
      status: 400,
    });
  }

  const isAlreadyRegistered = await UserModel.findOne({ email });

  if (isAlreadyRegistered) {
    return NextResponse.json({
      msg: "User already registered",
      status: 400,
    });
  }

  const hashedPassword = await hash(password, 12);

  const newUser = new UserModel({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return NextResponse.json({
    msg: "User Created",
    status: 200,
  });
}
