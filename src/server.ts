import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.router.js";
import bookingRouter from "./routes/booking.router.js";
import movieRouter from "./routes/Movie.router.js";
import showtimeRoutes from "./routes/showtime.routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes are here
app.use("/auth", authRouter);

app.use("/api/bookings",bookingRouter)

app.use("/movies", movieRouter);

app.use("/api/showtimes",showtimeRoutes);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});