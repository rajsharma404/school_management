import mongoose from "mongoose";

const UniversalFeeSchema = new mongoose.Schema({
    className: { type: String, required: true, unique: true },
    feeAmount: { type: Number, required: true }
});

const Set_Universal_Fee = mongoose.models.Set_Universal_Fee || mongoose.model("Set_Universal_Fee", UniversalFeeSchema);

export default Set_Universal_Fee;
