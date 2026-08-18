import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI as string;
        await mongoose.connect(uri);
        console.log("MongoDB connected ✅");
    } catch (error) {
        console.error("MongoDB connection failed", error);
        process.exit(1);
    }
};