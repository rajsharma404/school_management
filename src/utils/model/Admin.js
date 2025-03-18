import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

export default mongoose.models.admins || mongoose.model("admins", AdminSchema);
