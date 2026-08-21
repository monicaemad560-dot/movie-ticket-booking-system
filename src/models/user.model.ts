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

interface IShowtime extends Document {
    movieId: String; // Reference to the Movie model
    movieName : string;
    hallnumber: String;
    date: String;
    startTime: String;
    endTime: String;
    ticketprice: number;
    totalcapacity: number;
    selectedSeats: [string];
}

const ShowtimeSchema: Schema = new Schema({
    movieId: { type: String, required: true },
    movieName : { type: String, required: true},
    hallnumber: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    ticketprice: { type: Number, required: true },
    totalcapacity: { type: Number, required: true },
    selectedSeats : { type: [String], default : [] ,required : true}
});

export const Showtime = mongoose.model<IShowtime>("Showtime", ShowtimeSchema);