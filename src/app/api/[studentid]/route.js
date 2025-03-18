

import { Product } from "@/utils/model/Product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    try {
        const { studentid } = params;
        const filter = { _id: studentid };
        const payload = await req.json();
        await mongoose.connect("mongodb+srv://indianraj360:school33@cluster0.s1hc7.mongodb.net/school_management");

        // await mongoose.connect("mongodb+srv://indianraj360:school33@cluster0.s1hc7.mongodb.net/school_management", { useNewUrlParser: true, useUnifiedTopology: true });

        const result = await Product.findOneAndUpdate(filter, payload, { new: true });

        return NextResponse.json({ result, success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// export async function GET(req, res) {
//     try {
//         const studentId = res.params.studentid;
//         const record = { _id: studentId }
//         await mongoose.connect("mongodb+srv://indianraj360:school33@cluster0.s1hc7.mongodb.net/school_management", { useNewUrlParser: true, useUnifiedTopology: true });

//         const result = await Product.findById(record);

//         if (!result) {
//             return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
//         }

//         return NextResponse.json({ result, success: true });
//     } catch (error) {
//         return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//     }
// }


export async function GET(req, { params }) {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        const studentId = params.studentid;
        const student = await Product.findById(studentId);

        if (!student) {
            return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
        }

        // Convert photo Buffer to Base64 if it exists
        const studentData = student.toObject();
        if (studentData.photo && studentData.photo.data) {
            studentData.photo = `data:image/png;base64,${studentData.photo.toString("base64")}`;
        }

        return NextResponse.json({ result: studentData, success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}


export async function DELETE(req, { params }) {
    try {
        const { studentid } = params;
        await mongoose.connect("mongodb+srv://indianraj360:school33@cluster0.s1hc7.mongodb.net/school_management");

        const result = await Product.findByIdAndDelete(studentid);
        if (!result) {
            return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Student deleted successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
