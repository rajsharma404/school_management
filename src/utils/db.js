import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect("mongodb+srv://indianraj360:school33@cluster0.s1hc7.mongodb.net/school_management", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Database Connected");
    } catch (error) {
        console.error("❌ Database Connection Error:", error);
    }
};


export default connectDB;
