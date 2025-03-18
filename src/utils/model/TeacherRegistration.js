import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    specialty: { type: String, required: true },
    techedClass: { type: String, required: true },
    date: { type: Date, default: Date.now },
    fee: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export const TeacherRegistration = mongoose.models.TeacherRegistration || mongoose.model("TeacherRegistration", teacherSchema);

