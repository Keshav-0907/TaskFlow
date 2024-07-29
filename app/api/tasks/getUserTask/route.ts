import { NextResponse, NextRequest } from "next/server";
import { connectToDb } from "@/utils/connectToDb";
import TaskModel from "@/models/TaskModel";

export async function POST(req: NextRequest) {
    const {userID} = await req.json()

    await connectToDb();

    const userTasks = await TaskModel.find({createdBy: userID});

    return NextResponse.json(userTasks);
}
