import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import { Product } from "@/utils/model/Product";

export async function GET(req, { params }) {
    try {
        await connectDB(); // Ensure DB connection

        if (!params?.id) {
            return NextResponse.json({ error: "Student ID is required" }, { status: 400 });
        }

        const student = await Product.findById(params.id);
        if (!student) {
            return NextResponse.json({ error: "Student not found" }, { status: 404 });
        }

        return NextResponse.json(student, { status: 200 });

    } catch (error) {
        console.error("Error fetching student:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
