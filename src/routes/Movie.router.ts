import { Router } from "express";
import {
    createMovie,
    getMovies,
    getMovieById,
    updateMovie,
    deleteMovie
} from "../controllers/Movie.controller.js";

const movieRouter = Router();

movieRouter.post("/", createMovie);
movieRouter.get("/", getMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.put("/:id", updateMovie);
movieRouter.delete("/:id", deleteMovie);

export default movieRouter;