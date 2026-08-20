import {request, response , NextFunction} from 'express';

export const validateShowtime = (req: typeof request, res: typeof response, next: Function) => {
    const { movieId, hallnumber ,date , startTime, endTime, ticketprice ,totalcapacity } = req.body;

    if (movieId ===undefined|| hallnumber===undefined || date===undefined || startTime===undefined || endTime===undefined || ticketprice===undefined || totalcapacity===undefined) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    next();
};