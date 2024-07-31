import { NextResponse, NextRequest } from "next/server";
import { connectToDb } from "@/utils/connectToDb";
import TaskModel from "@/models/TaskModel";

export async function POST(req: NextRequest) {
  const { title, priority, deadline, description, status, createdBy } = await req.json();

  if(!title || !status || !description) {
    return NextResponse.json({
      msg: "Please fill in all required fields",
      status: 400,
    });
  }

    await connectToDb();

    const newTask = new TaskModel({
        title,
        priority,
        deadline,
        description,
        status,
        createdBy
    })

    await newTask.save();

    return Response.json({
        msg: "Task created successfully",
        status: 200,
    })
}
