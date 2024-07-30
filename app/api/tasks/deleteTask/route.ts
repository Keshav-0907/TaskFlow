import { NextResponse, NextRequest } from "next/server";
import { connectToDb } from "@/utils/connectToDb";
import TaskModel from "@/models/TaskModel";

export async function POST(req: NextRequest) {
  try {
    const { taskId } = await req.json();

    if (!taskId) {
      return NextResponse.json({
        message: "Missing userId or taskId",
        status: 400,
      });
    }

    await connectToDb();

    const task = await TaskModel.findById(taskId);

    if (!task) {
      return NextResponse.json({
        message: "Task not found",
        status: 404,
      });
    }

    await TaskModel.findByIdAndDelete(taskId);

    return NextResponse.json({
      message: "Task deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({
      message: "Internal Server Error",
      status: 500,
    });
  }
}
