import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Admin from "@/utils/model/Admin";
import { Product } from "@/utils/model/Product";
import { TeacherRegistration } from "@/utils/model/TeacherRegistration";
export async function POST(req) {

    try {
        await mongoose.connect("mongodb+srv://indianraj360:school33@cluster0.s1hc7.mongodb.net/school_management");

        const { username, password, role } = await req.json();
        let user;

        if (role === "admin") {
            user = await Admin.findOne({ username });
        } else if (role === "teacher") {
            user = await TeacherRegistration.findOne({ username });
        } else if (role === "student") {
            user = await Product.findOne({ username });
        } else {
            return NextResponse.json({ message: "Invalid role" }, { status: 400 });
        }

        if (!user) {
            return NextResponse.json({ message: `${role} not found` }, { status: 400 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "❌ Incorrect password" }, { status: 401 });
        }

        const jwtSecrat = "dc39e3360694a5ddfbc51a97740a416822a21967d6fdf746035239abba1fb2db";
        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" } // Token expires in 1 day
        );

        // Set token in cookie
        const response = NextResponse.json({ message: `✅ ${role} login successful` }, { status: 200 });
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24, // 1 day
        });

        return response;
    } catch (error) {
        return NextResponse.json({ message: "❌ Server error", error: error.message }, { status: 500 });
    }
}
