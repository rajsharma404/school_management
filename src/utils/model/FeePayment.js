import mongoose from "mongoose";

const FeePaymentSchema = new mongoose.Schema({
    studentID: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    studentName: { type: String, required: true },
    fatherName: { type: String, required: true },
    className: { type: String, required: true },
    amount: { type: Number, required: true, min: 1 },
    paymentMethod: { type: String, required: true },
    date: { type: String, required: true }
});

export default mongoose.models.FeePayment || mongoose.model("FeePayment", FeePaymentSchema);
