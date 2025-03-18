import { NextResponse } from "next/server";
import FeePayment from "@/utils/model/FeePayment";
import connectDB from "@/utils/db";

export async function POST(req) {
    try {
        await connectDB()

        const data = await req.json();
        console.log("Received Payment Data:", data); // Debugging

        if (!data.studentID?.trim()) {
            return NextResponse.json({ error: "Student ID is required" }, { status: 400 });
        }

        if (!data.studentName?.trim() ||
            !data.fatherName?.trim() ||
            !data.rollNumber?.trim() ||
            !data.className?.trim() ||
            !data.paymentMethod?.trim() ||
            !data.date?.trim() ||
            isNaN(data.amount) || Number(data.amount) <= 0) {
            return NextResponse.json({ error: "All fields are required and must be valid" }, { status: 400 });
        }

        const payment = new FeePayment(data);
        await payment.save();
        return NextResponse.json({ message: "Payment successful" }, { status: 200 });

    } catch (error) {
        console.error("Error processing payment:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const payments = await FeePayment.find();
        return NextResponse.json({ success: true, data: payments });
    } catch (error) {
        console.error("Error fetching fee payments:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
    }
}
