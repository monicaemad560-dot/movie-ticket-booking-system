import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const movieRoutesPath = path.resolve(
    process.cwd(),
    "src",
    "routes",
    "Movie.router.ts"
);

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Movie Ticket Booking System API",
            version: "1.0.0",
            description: "API for browsing movies, booking tickets, and managing showtimes."
        }
    },
    apis: [movieRoutesPath]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;