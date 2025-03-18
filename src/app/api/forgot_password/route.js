import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Otp from "@/utils/model/Otp";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Admin from "@/utils/model/Admin";
import { Product } from "@/utils/model/Product";
import { TeacherRegistration } from "@/utils/model/TeacherRegistration";

dotenv.config({ path: ".env.local" });

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function POST(req) {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const { email, role } = await req.json();
        let userModel;

        // Determine which model to use based on role
        if (role === "teacher") {
            userModel = TeacherRegistration;
        } else if (role === "admin") {
            userModel = Admin;
        } else if (role === "student") {
            userModel = Product;
        } else {
            return NextResponse.json({ success: false, error: "Invalid role specified" }, { status: 400 });
        }

        // Find user in the database
        const user = await userModel.findOne({ username: email });
        if (!user) {
            return NextResponse.json({ success: false, error: "Email not registered" }, { status: 400 });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        const expiry = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes

        // Save OTP in database
        await Otp.findOneAndUpdate({ email }, { otp, expiry }, { upsert: true });

        console.log(`Generated OTP for ${email}: ${otp}`);

        // Send OTP Email
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
        });

        return NextResponse.json({ success: true, message: "OTP sent to email" });

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
