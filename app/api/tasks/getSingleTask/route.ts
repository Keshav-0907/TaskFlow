import { NextResponse, NextRequest } from "next/server";
import { connectToDb } from "@/utils/connectToDb";
import TaskModel from "@/models/TaskModel";

export async function POST(req: NextRequest) {
  const { userId, taskId } = await req.json();

  await connectToDb()

  const task = await TaskModel.find({ _id: taskId });

  return NextResponse.json({
    task,
    status: 400,
  });
}
