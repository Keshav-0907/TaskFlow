import { NextResponse, NextRequest } from "next/server";
import { connectToDb } from "@/utils/connectToDb";
import TaskModel from "@/models/TaskModel";

export async function PUT(req: NextRequest) {
  const { taskId, title, priority, deadline, description, status, updatedBy } = await req.json();

  if (!taskId || !title || !status) {
    return NextResponse.json({
      msg: "Please fill in all required fields",
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

  task.title = title;
  task.priority = priority;
  task.deadline = deadline;
  task.description = description;
  task.status = status;
  task.updatedBy = updatedBy;

  await task.save();

  return NextResponse.json({
    msg: "Task updated successfully",
    status: 200,
  });
}
