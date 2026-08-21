import { Router } from "express";
import { reservation,getAll } from "../controllers/booking.controller.js";
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - movieId
 *         - movieName
 *         - hallnumber
 *         - date
 *         - startTime
 *         - endTime
 *         - ticketprice
 *         - totalcapacity
 *         - seatsRequired
 *         - selectedSeats
 *       properties:
 *         movieId:
 *           type: string
 *           description: Id of the movie
 *         movieName:
 *           type: string
 *           description: The Name of the Movie
 *         hallnumber:
 *           type: string
 *           description: The number of the Hall Where The movie will be Presented
 *         date:
 *           type: string
 *           description: The Date of the Show 
 *         startTime:
 *           type: string
 *           description: The Time the show begins
 *         endTime:
 *           type: string
 *           description: The time the show ends
 *         ticketprice:
 *           type: number
 *           description: The price of the Ticket
 *         totalcapacity:
 *           type: number
 *           description: The number of the available seats in the Hall
 *         seatsRequired:
 *           type: number
 *           description: The number of Seats The user need
 *         selectedSeats:
 *           type: [string]
 *           description: The Positions of the seats like {A1,A2,B1,.....}
 *       example:
 *         movieId: E900
 *         movieName: Spider-Man
 *         hallnumber: 1MAX
 *         date: 03-04-2027
 *         startTime: 10 PM
 *         endTime: 12 AM
 *         ticketprice: 170
 *         totalcapacity: 100
 *         seatsRequired: 5
 *         selectedSeats: [A1,A2,B1,B2,B3]
 */
/**
 * @swagger
 * tags:
 *   name: Reservation
 *   description: Reservation Logic and How it works
 */
/**
 * @swagger
 * /egybest:
 *   get:
 *     tags: Bookings
 *     summary: it Present the hole movies for the user to make it easier for him to choose 
 *     responses:
 *       200:
 *         description: The Data Pressented Successfully
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Some server error!
 */
router.get("/",getAll)

/**
 * @swagger
 * /egybest:
 *   patch:
 *     tags: Bookings
 *     summary: it's the hole logic of the program of the reservation logic
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: The Reservation is done successfully 
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: it defines more than one thing, the movie is not found, no seats available,some information is missing, the seats are reserved already
 *       500:
 *         description: Some server error!
 */
router.patch("/",reservation)

export default router ;