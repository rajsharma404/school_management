import Otp from "@/utils/model/Otp";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        const { email } = await req.json();
        await mongoose.connect("mongodb+srv://indianraj360:school33@cluster0.s1hc7.mongodb.net/school_management")

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        const expiry = new Date(Date.now() + 5 * 60 * 1000); // Expires in 5 min

        // Store OTP in MongoDB
        await Otp.findOneAndUpdate(
            { email },
            { otp, expiry },
            { upsert: true, new: true }
        );

        console.log(`Generated OTP for ${email}: ${otp}`);
        return NextResponse.json({ success: true, message: "OTP sent successfully" });

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
