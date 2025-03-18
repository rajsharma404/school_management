import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Set_Universal_Fee from "@/utils/model/Set_Universal_Fee";

const MONGODB_URI = "mongodb+srv://indianraj360:school33@cluster0.s1hc7.mongodb.net/school_management";

// Database Connection Function
async function connectDB() {
    if (mongoose.connection.readyState === 1) {
        return;
    }
    await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

// GET method to fetch all fees or a specific class fee
export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const className = searchParams.get("className");

        let fees;
        if (className) {
            // Fetch fee for a specific class
            fees = await Set_Universal_Fee.findOne({ className });
            if (!fees) {
                return NextResponse.json({ error: "Class not found" }, { status: 404 });
            }
        } else {
            // Fetch all fees
            fees = await Set_Universal_Fee.find();
        }

        return NextResponse.json(fees, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}

// POST method to set or update class fees
export async function POST(req) {
    try {
        await connectDB();
        const { className, feeAmount } = await req.json();

        if (!className || !feeAmount) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Find and update if exists, else create a new one
        const updatedFee = await Set_Universal_Fee.findOneAndUpdate(
            { className }, // Find by class name
            { feeAmount }, // Update feeAmount
            { new: true, upsert: true } // Return the updated doc, create if not found
        );

        return NextResponse.json({ message: "Fee updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}

