import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Admin from "@/utils/model/Admin";
import Otp from "@/utils/model/Otp";
import { Product } from "@/utils/model/Product";
import { TeacherRegistration } from "@/utils/model/TeacherRegistration";

export async function POST(req) {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const { email, otp, newPassword, role } = await req.json();
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

        // Check OTP in database
        const otpRecord = await Otp.findOne({ email });
        if (!otpRecord || otpRecord.otp !== Number(otp) || otpRecord.expiry < new Date()) {
            return NextResponse.json({ success: false, error: "Invalid or expired OTP" }, { status: 400 });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password without triggering required field validation
        const updatedUser = await userModel.findOneAndUpdate(
            { username: email }, // Find by username
            { password: hashedPassword }, // Update password field only
            { new: true, runValidators: false } // Avoid validation errors
        );

        if (!updatedUser) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }

        await Otp.deleteOne({ email }); // Remove OTP after use

        return NextResponse.json({ success: true, message: "Password updated successfully" });

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
