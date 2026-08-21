import mongoose,{Document,Schema} from "mongoose";

interface IShowtime extends Document {
    movieId: String; // Reference to the Movie model
    movieName : string;
    hallnumber: String;
    date: String;
    startTime: String;
    endTime: String;
    ticketprice: number;
    totalcapacity: number;
    selectedSeats: string[];
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
    selectedSeats : { type: [String], default : [] ,required : true},
});

export const Showtime = mongoose.model<IShowtime>("Showtime", ShowtimeSchema);