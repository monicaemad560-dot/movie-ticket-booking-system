import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});