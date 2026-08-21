import mongoose,{Document,Schema} from "mongoose";

interface IShowtime extends Document {
    movieId: Schema.Types.ObjectId; // Reference to the Movie model
    hallnumber: number;
    date: Date;
    startTime: Date;
    endTime: Date;
    ticketprice: number;
    totalcapacity: number;
}

const ShowtimeSchema: Schema = new Schema({
    movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    hallnumber: { type: Number, required: true },
    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    ticketprice: { type: Number, required: true },
    totalcapacity: { type: Number, required: true }
});

export const Showtime = mongoose.model<IShowtime>("Showtime", ShowtimeSchema);