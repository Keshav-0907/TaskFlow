import { NextResponse, NextRequest } from "next/server";
import { compare } from "bcryptjs";
import UserModel from "@/models/UserModel";
import { connectToDb } from "@/utils/connectToDb";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      {
        msg: "Please fill in all fields",
      },
      { status: 400 }
    );
  }

  await connectToDb();

  const isUser = await UserModel.findOne({ email });
  if (!isUser) {
    return NextResponse.json(
      {
        msg: "User not found",
      },
      { status: 400 }
    );
  }

  const isPasswordCorrect = await compare(password, isUser.password);

  if (!isPasswordCorrect) {
    return NextResponse.json(
      {
        msg: "Invalid credentials",
      },
      { status: 400 }
    );
  }
//FIX
  const token = jwt.sign({ id: isUser._id }, 'keshav', {
    expiresIn: "1h",
  });

  return NextResponse.json(
    {
      status: 200,
      msg: "Login successful",
      token,
    },
  );
}
