import { Request, Response } from "express";
import MovieModel from "../models/MovieModel.js";

// POST /movies
export const createMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, genre, duration, releaseDate, rating } = req.body;

        const movie = await MovieModel.create({
            title,
            description,
            genre,
            duration,
            releaseDate,
            rating
        });

        res.status(201).json({
            message: "Movie created successfully.",
            movie
        });
    } catch (error) {
         console.error("GET MOVIE BY ID ERROR:", error);

    res.status(500).json({
        message: "Server error",
        error
    });
    }
};

// GET /movies
export const getMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const { genre, title } = req.query;

        const filter: any = {};

        if (genre) {
            filter.genre = genre;
        }

        if (title) {
            filter.title = { $regex: title, $options: "i" };
        }

        const movies = await MovieModel.find(filter);

        res.status(200).json({
            movies
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error
        });
    }
};

// GET /movies/:id
export const getMovieById = async (req: Request, res: Response): Promise<void> => {
    try {
        const movie = await MovieModel.findById(req.params.id);

        if (!movie) {
            res.status(404).json({
                message: "Movie not found."
            });
            return;
        }

        res.status(200).json({
            movie
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error
        });
    }
};

// PUT /movies/:id
export const updateMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const movie = await MovieModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!movie) {
            res.status(404).json({
                message: "Movie not found."
            });
            return;
        }

        res.status(200).json({
            message: "Movie updated successfully.",
            movie
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error
        });
    }
};

// DELETE /movies/:id
export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const movie = await MovieModel.findByIdAndDelete(req.params.id);

        if (!movie) {
            res.status(404).json({
                message: "Movie not found."
            });
            return;
        }

        res.status(200).json({
            message: "Movie deleted successfully."
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error
        });
    }
};