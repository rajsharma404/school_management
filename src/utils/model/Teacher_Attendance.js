import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Student" },
    status: { type: String, required: true, enum: ["Present", "Absent", "Late"] },
    date: { type: Date, default: Date.now }
});

export default mongoose.models.AttendanceMarking || mongoose.model("AttendanceMarking", attendanceSchema);
