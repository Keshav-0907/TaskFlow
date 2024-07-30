import { NextResponse, NextRequest } from "next/server";
import { connectToDb } from "@/utils/connectToDb";
import TaskModel from "@/models/TaskModel";

export async function PUT(req: NextRequest) {
  const { taskId, status } = await req.json();

  if (!taskId || !status) {
    return NextResponse.json({
      msg: "Please provide both taskId and status",
      status: 400,
    });
  }

  await connectToDb();

  const task = await TaskModel.findById(taskId);
  if (!task) {
    return NextResponse.json({
      msg: "Task not found",
      status: 404,
    });
  }

  task.status = status;

  await task.save();

  return NextResponse.json({
    msg: "Task status updated successfully",
    status: 200,
  });
}
