import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "@/models/UserModel";

interface DecodedToken {
  id: string;
}

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        {
          msg: "Invalid credentials",
        },
        { status: 400 }
      );
    }

    const decodedToken = jwt.verify(token, `${process.env.NEXT_PUBLIC_JWT_SECRET}`) as DecodedToken;

    const userId = decodedToken?.id;

    if (!userId) {
      return NextResponse.json(
        {
          msg: "Invalid credentials",
        },
        { status: 400 }
      );
    }

    const userDetails = await UserModel.findById(userId).select("-password");

    if (!userDetails) {
      return NextResponse.json(
        {
          msg: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        msg: "User found",
        userDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    let errorMessage = "An error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        msg: errorMessage,
      },
      { status: 500 }
    );
  }
}
