import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: Number, required: true },
    expiry: { type: Date, required: true },
});

export default mongoose.models.Otp || mongoose.model("Otp", OtpSchema);
