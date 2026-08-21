import { Router } from "express";
import {
    addmovieInfo,
    getmoviesInfo,
    getmovieinfoById,
    updatemovieInfo,
    deletemovieinfo
} from "../controllers/Movie.controller.js";
import { authorize, protect } from "../middleware/auth.middleware.js";
const movieRouter = Router();

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - genre
 *               - duration
 *               - releaseDate
 *               - rating
 *             properties:
 *               title:
 *                 type: string
 *                 example: Inception
 *               description:
 *                 type: string
 *                 example: A skilled thief enters dreams to steal secrets.
 *               genre:
 *                 type: string
 *                 example: Sci-Fi
 *               duration:
 *                 type: number
 *                 example: 148
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 example: 2010-07-16
 *               rating:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 10
 *                 example: 8.8
 *     responses:
 *       201:
 *         description: Movie created successfully
 *       500:
 *         description: Server error
 */
movieRouter.post("/",protect,authorize('Cinema Admin'), addmovieInfo);

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter movies by genre
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Search movies by title
 *     responses:
 *       200:
 *         description: List of movies
 *       500:
 *         description: Server error
 */
movieRouter.get("/",protect, getmoviesInfo);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie found
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Server error
 */
movieRouter.get("/:id",protect, getmovieinfoById);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               genre:
 *                 type: string
 *               duration:
 *                 type: number
 *               releaseDate:
 *                 type: string
 *                 format: date
 *               rating:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 10
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Server error
 */
movieRouter.put("/:id", protect , authorize('Cinema Admin') , updatemovieInfo);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Server error
 */
movieRouter.delete("/:id", protect , authorize('Cinema Admin') , deletemovieinfo);

export default movieRouter;