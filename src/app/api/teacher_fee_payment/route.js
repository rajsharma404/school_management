import { NextResponse } from "next/server";
import Teacher_fee_payment from "@/utils/model/Teacher_fee_payment";
import mongoose from "mongoose";


export async function POST(req) {
    try {
        await mongoose.connect("mongodb+srv://indianraj360:school33@cluster0.s1hc7.mongodb.net/school_management");

        const data = await req.json();
        console.log("Received Payment Data:", JSON.stringify(data, null, 2)); // Debugging

        if (!data.TeacherID?.trim()) {
            return NextResponse.json({ error: "Teacher ID is required" }, { status: 400 });
        }

        if (!data.TeacherName?.trim() ||
            !data.Phone?.trim() ||
            !data.Email?.trim() ||
            !data.TechedClass?.trim() ||  // ✅ Fixed casing
            !data.Speciality?.trim() ||   // ✅ Fixed casing
            !data.date?.trim() ||
            isNaN(data.amount) || Number(data.amount) <= 0) {
            return NextResponse.json({ error: "All fields are required and must be valid" }, { status: 400 });
        }

        const payment = new Teacher_fee_payment(data);
        await payment.save();
        return NextResponse.json({ message: "Payment successful" }, { status: 200 });

    } catch (error) {
        console.error("Error processing payment:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await mongoose.connect("mongodb+srv://indianraj360:school33@cluster0.s1hc7.mongodb.net/school_management");
        const payments = await Teacher_fee_payment.find();
        return NextResponse.json({ success: true, data: payments });
    } catch (error) {
        console.error("Error fetching fee payments:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
    }
}
