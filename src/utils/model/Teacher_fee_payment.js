import mongoose from "mongoose";

const FeePaymentSchema = new mongoose.Schema({
    TeacherID: { type: String, required: true },  // ✅ Added TeacherID
    TeacherName: { type: String, required: true },
    Phone: { type: String, required: true },
    Email: { type: String, required: true },
    TechedClass: { type: String, required: true }, // ✅ Fixed casing
    Speciality: { type: String, required: true },  // ✅ Fixed casing
    amount: { type: Number, required: true, min: 1 },
    paymentMethod: { type: String, required: true },
    date: { type: String, required: true },
});

export default mongoose.models.Teacher_FeePayment || mongoose.model("Teacher_FeePayment", FeePaymentSchema);
