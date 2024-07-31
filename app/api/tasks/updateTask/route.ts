import { NextResponse, NextRequest } from "next/server";
import { connectToDb } from "@/utils/connectToDb";
import TaskModel from "@/models/TaskModel";

export async function PUT(req: NextRequest) {
  const { taskId, title, priority, deadline, description, status } = await req.json();

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
  task.status = status

  await task.save();

  return NextResponse.json({
    msg: "Task updated successfully",
    status: 200,
  });
}
