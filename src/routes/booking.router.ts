import { Router } from "express";
import { reservation,reciept,cancel } from "../controllers/booking.controller.js";
import { authorize, protect } from "../middleware/auth.middleware.js";
import { cancelBooking } from "../controllers/booking.controller.js";
const bookingRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - userId
 *         - showtimeId
 *         - seatsRequired
 *         - selectedSeats
 *       properties:
 *         userId:
 *           type: string
 *           description: Id of the user making the booking
 *         showtimeId:
 *           type: string
 *           description: Id of the showtime being booked
 *         seatsRequired:
 *           type: number
 *           description: Number of seats requested
 *         selectedSeats:
 *           type: array
 *           items:
 *             type: string
 *           description: The seat positions selected, e.g. [A1, A2, B1]
 *         totalPrice:
 *           type: number
 *           description: Total price calculated for the booking (auto-calculated, not sent by user)
 *         status:
 *           type: string
 *           enum: [preparing, confirmed, canceled]
 *           description: Current status of the booking
 *       example:
 *         userId: 64f1a2b3c4d5e6f7a8b9c0d1
 *         showtimeId: 64f1a2b3c4d5e6f7a8b9c0d2
 *         seatsRequired: 3
 *         selectedSeats: [A1, A2, B1]
 */
/**
 * @swagger
 * tags:
 *   name: Reservation
 *   description: Reservation Logic and How it works
 */
/**
 * @swagger
 * /api/bookings:
 *   get:
 *     tags: [Reservation]
 *     summary: Get all bookings
 *     responses:
 *       200:
 *         description: The Data Presented Successfully
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Some server error!
 */
bookingRouter.get("/",reciept)

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     tags: [Reservation]
 *     summary: Create a new reservation (seat booking logic)
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
 *         description: Movie not found, no seats available, missing info, or seats already reserved
 *       500:
 *         description: Some server error!
 */

bookingRouter.post("/",reservation)

/**
 * @swagger
 /**
 * @swagger
 * /api/bookings/{id}/cancel:
 *   patch:
 *     tags: [Reservation]
 *     summary: Cancel the reservation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking canceled successfully
 *       400:
 *         description: Booking cannot be canceled after the movie starts
 *       404:
 *         description: Booking or Showtime not found
 *       500:
 *         description: Some server error
 */
bookingRouter.patch("/:id/cancel", protect, cancel);

bookingRouter.delete("/:id", protect, authorize("Cinema Admin"), cancel);

export default bookingRouter;
