import connectDB from "@/utils/db";
import { Product } from "@/utils/model/Product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const bcrypt = require("bcryptjs");
// Import bcrypt for password hashing
import crypto from "crypto";  // Import crypto to generate random passwords


export async function GET() {
    try {
        await mongoose.connect("mongodb+srv://indianraj360:school33@cluster0.s1hc7.mongodb.net/school_management")

        let data = await Product.find();
        return NextResponse.json({ result: data }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ result: "Error saving data", success: false, error: error.message }, { status: 500 });
    }

}
// Function to generate a random password
const generateRandomPassword = () => {
    return crypto.randomBytes(8).toString("hex"); // Generate a random 16-character hex string
};
export async function POST(req) {
    try {
        await mongoose.connect("mongodb+srv://indianraj360:school33@cluster0.s1hc7.mongodb.net/school_management");

        const payload = await req.json();

        // Generate username (same as email) and a random password
        const username1 = payload.email;
        const plainPassword = generateRandomPassword();

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        // Get the current year (e.g., 2025 → "25")
        const currentYear = new Date().getFullYear().toString().slice(2);

        // Find the latest roll number
        const latestStudent = await Product.findOne({ rollNumber: { $exists: true, $ne: null } })
            .sort({ createdAt: -1 })  // Sort by newest entry
            .select("rollNumber");

        let newRollNumber;
        if (!latestStudent || isNaN(parseInt(latestStudent.rollNumber))) {
            newRollNumber = `${currentYear}0001`;
        } else {
            newRollNumber = (parseInt(latestStudent.rollNumber) + 1).toString();
        }

        // Add new fields to the payload
        const students = new Product({
            ...payload,
            username: username1,
            password: hashedPassword,
            rollNumber: newRollNumber,
            fee: 0
        });

        await students.save();

        return NextResponse.json({ result: "New user created", success: true, rollNumber: newRollNumber }, { status: 201 });

    } catch (error) {
        console.error("Error:", error);  // Log the error in your server console
        return NextResponse.json({ result: "Error saving data", success: false, error: error.message }, { status: 500 });
    }
}
