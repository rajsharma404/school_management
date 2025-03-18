import connectDB from "@/utils/db";
import Admin from "@/utils/model/Admin";
import mongoose from "mongoose";
import { NextResponse } from "next/server";



export async function GET() {
    try {
        await mongoose.connect("mongodb+srv://indianraj360:school33@cluster0.s1hc7.mongodb.net/school_management")

        let data = await Admin.find();
        return NextResponse.json({ result: data }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ result: "Error saving data", success: false, error: error.message }, { status: 500 });
    }

}

