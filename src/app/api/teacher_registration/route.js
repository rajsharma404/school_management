"use server";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import mongoose from "mongoose";
import { TeacherRegistration } from "@/utils/model/TeacherRegistration";

const generateRandomPassword = () => {
    return crypto.randomBytes(8).toString("hex");
};

export async function POST(req) {
    try {
        await mongoose.connect("mongodb+srv://indianraj360:school33@cluster0.s1hc7.mongodb.net/school_management");

        const payload = await req.json();
        const username1 = payload.email;
        const plainPassword = generateRandomPassword();

        // Check if teacher already exists
        const existingTeacher = await TeacherRegistration.findOne({ email: payload.email });
        if (existingTeacher) {
            return NextResponse.json({
                result: "Email already exists",
                success: false
            }, { status: 400 });  // 400 = Bad Request
        }

        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        const newTeacher = new TeacherRegistration({
            ...payload,
            username: username1,
            password: hashedPassword,
        });

        await newTeacher.save();

        return NextResponse.json({
            result: "New teacher registered",
            success: true,
            username: username1,
            plainPassword
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({
            result: "Error saving data",
            success: false,
            error: error.message
        }, { status: 500 });
    }
}

// GET method for retrieving all teachers
export async function GET() {
    try {
        await mongoose.connect("mongodb+srv://indianraj360:school33@cluster0.s1hc7.mongodb.net/school_management");

        const teachers = await TeacherRegistration.find();
        return NextResponse.json({ result: teachers, success: true }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ result: "Error fetching data", success: false, error: error.message }, { status: 500 });
    }
}
