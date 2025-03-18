import mongoose from "mongoose";

// Define the schema with added validation where needed
const ProductSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Username must be at least 5 characters long']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long']
    },

    name: {
        type: String,
        required: true
    },
    fName: { type: String },
    mName: { type: String },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']  // Email format validation
    },
    phone: {
        type: String,
        match: [/^\d{10}$/, 'Phone number must be 10 digits']  // Optional: validate phone number format
    },
    gender: { type: String },
    dob: { type: String },  // You may consider using Date type for dob if you plan to manipulate it as a date.
    address: { type: String },
    city: { type: String },
    state: { type: String },
    pinCode: { type: String, match: [/^\d{6}$/, 'Pin code must be 6 digits'] },  // Optional: validate pin code format
    adhar: { type: String },
    rollNumber: { type: String },
    // fee: { type: String },
    highestQualification: { type: String },
    previousSchool: { type: String },
    class: { type: String },
    fee: { type: Number, default: 0 },
    courseAply: { type: String },
    photo: { type: Buffer },
    signature: { type: Buffer },
    adharphoto: { type: Buffer },
}, { timestamps: true });  // Added `timestamps` to track creation and update times

// Explicitly define the collection name
export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
