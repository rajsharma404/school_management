import AttendanceMarking from "@/utils/model/attendanceMarking";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await mongoose.connect("mongodb+srv://indianraj360:school33@cluster0.s1hc7.mongodb.net/school_management")

        let data = await AttendanceMarking.find()
        return NextResponse.json({ result: data }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ result: "Error saving data", success: false, error: error.message }, { status: 500 });
    }

}


// export async function POST(req) {
//     try {
//         await mongoose.connect("mongodb+srv://indianraj360:school33@cluster0.s1hc7.mongodb.net/school_management");

//         const payload = await req.json();

//         if (!payload.attendance || !Array.isArray(payload.attendance)) {
//             return NextResponse.json({ result: "Invalid data format", success: false }, { status: 400 });
//         }

//         console.log("✅ Received Attendance Data:", payload.attendance);

//         // Log each entry to verify structure
//         payload.attendance.forEach((entry, index) => {
//             console.log(`Entry ${index + 1}:`, entry);
//         });

//         return NextResponse.json({ result: "Debugging: Check server logs", success: true });

//     } catch (error) {
//         console.error("❌ Attendance Marking Error:", error.message);
//         return NextResponse.json({ result: "Error saving data", success: false, error: error.message }, { status: 500 });
//     }
// }
export async function POST(req) {
    try {
        await mongoose.connect("mongodb+srv://indianraj360:school33@cluster0.s1hc7.mongodb.net/school_management");

        const { attendance } = await req.json();

        if (!attendance || !Array.isArray(attendance)) {
            return NextResponse.json({ success: false, message: "Invalid attendance data" }, { status: 400 });
        }

        // Save attendance records to MongoDB
        const records = await AttendanceMarking.insertMany(attendance);

        return NextResponse.json({ success: true, message: "Attendance saved successfully", records }, { status: 201 });
    } catch (error) {
        console.error("Error saving attendance:", error);
        return NextResponse.json({ success: false, message: "Error saving attendance" }, { status: 500 });
    }
}

