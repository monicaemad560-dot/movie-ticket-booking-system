import {Router} from "express";
const router = Router();

import{
    createShowtime,
    getShowtimeById, 
    updateShowtime,
    deleteShowtime,
    getAllShowtimes  
} from "../controllers/showtime.controller.js"; 

import { validateShowtime } from "../middleware/showtime.middleware.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     showtime:
 *       type: object
 *       required:
 *         - movieId
 *         - hallnumber
 *         - date
 *         - startTime
 *         - endTime
 *         - ticketprice
 *         - totalcapacity
 *       properties:
 *         movieId:
 *           type: string
 *           description: The ID of the movie
 *         hallnumber:
 *           type: number
 *           description: The number of the hall
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the showtime
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: The start time of the showtime
 *         endTime:
 *           type: string
 *           format: date-time
 *           description: The end time of the showtime
 *         ticketprice:
 *           type: number
 *           description: The price of the ticket
 *         totalcapacity:
 *           type: number
 *           description: The total capacity of the hall
 *       example:
 *         movieId: "64f123456789abcdef123456"
 *         hallnumber: 1
 *         date: "2023-08-15"
 *         startTime: "2023-08-15T18:00:00Z"
 *         endTime: "2023-08-15T20:00:00Z"
 *         ticketprice: 10.5
 *         totalcapacity: 100
 */

/**
 * @swagger
 * tags:
 *   name: showtimes
 *   description: API for managing showtimes
 */

/**
 * @swagger
 * /showtimes:
 *   post:
 *     -tags: showtimes
 *     summary: Create a new showtime
 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/showtime"
 *     responses:
 *       201:
 *         description: Showtime created successfully
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/showtime"
 *       400:
 *         description: error occurred while creating the showtime

 */
router.post("/creat",validateShowtime , createShowtime);

/**
 * @swagger
 * /showtimes/{id}:
 *   get:
 *     -tags:
 *       - showtimes
 *     summary: Get a showtime by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the showtime
 *     responses:
 *       200:
 *         description: Showtime retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/showtime"
 *       404:
 *         description: Showtime not found
 *       500:
 *         description: Server error
 */


router.get("/:id", getShowtimeById);

/**
 * @swagger
 * /showtimes/{id}:
 *   put:
 *     -tags:
 *       - showtimes
 *     summary: Update a showtime
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the showtime
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/showtime"
 *     responses:
 *       200:
 *         description: Showtime updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/showtime"
 *       400:
 *         description: Invalid showtime data
 *       404:
 *         description: Showtime not found
 *       500:
 *         description: Server error
 */

router.put("/:id", updateShowtime, validateShowtime);

/**
 * @swagger
 * /showtimes/{id}:
 *   delete:
 *     -tags:
 *       - showtimes
 *     summary: Delete a showtime
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the showtime
 *     responses:
 *       200:
 *         description: Showtime deleted successfully
 *       404:
 *         description: Showtime not found
 *       500:
 *         description: Server error
 */


router.delete("/:id", deleteShowtime);

/**
 * @swagger
 * /showtimes:
 *   get:
 *     -tags:
 *       - showtimes
 *     summary: Get all showtimes
 *     responses:
 *       200:
 *         description: Showtimes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/showtime"
 *       500:
 *         description: Server error
 */

router.get("/", getAllShowtimes);

export default router;