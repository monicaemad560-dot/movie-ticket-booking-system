import mongoose, { Schema, Document } from "mongoose";

export interface Movie extends Document {
    title: string;
    description: string;
    genre: string;
    duration: number;
    releaseDate: Date;
    rating: number;
}

const movieSchema = new Schema<Movie>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    duration: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    rating: { type: Number, required: true, min: 0, max: 10 }
});

const MovieModel = mongoose.model<Movie>("Movie", movieSchema);

export default MovieModel;