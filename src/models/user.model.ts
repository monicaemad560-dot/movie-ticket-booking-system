import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    fullName: string;
    email: string;
    password: string;
    role: "Customer" | "Cinema Admin";
}

const userSchema = new Schema<User>({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["Customer", "Cinema Admin"],
        default: "Customer"
    }
});

export default mongoose.model<User>("User", userSchema);