import { Request, Response } from "express";
import { Booking } from "../models/booking.model.js";
import { Showtime } from "../models/showtime.model.js";
import bookingRouter from "../routes/booking.router.js";

export const reciept = async (req:Request,res:Response)=>{
    try{
        const all = await Booking.find();
        res.status(200).json(all)
    }catch(error){
        res.status(500).json({
            message : "Something Went Wrong !"
        })
    }
} 
export const history = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            res.status(400).json({
                message: "userId is required" 
            });
        }

        const bookings = await Booking.find({ userId : userId });

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong !"
        });
    }
};
export const reservation = async(req:Request,res:Response)=>{
    try{
        const {userId,showtimeId, seatsRequired,selectedSeats} = req.body
        if(!userId || !showtimeId || !seatsRequired || !selectedSeats){
            res.status(400).json({
                message : "Some Information Misssing"
            })
            return;
        }
    const movie = await Showtime.findOne({_id : showtimeId})
    if(!movie){
        res.status(400).json({
            message : "Movie is not Found"
        })
        return;
    }

    const dateToNumber = (date: Date | string): number => {
        return new Date(date).getTime();
    };
    const showtimeTime = dateToNumber(movie.startTime.toString());
    const now = new Date();
    if (showtimeTime < now.getTime()) {
        return res.status(400).json({
            message: "Bookings can only be made for upcoming showtimes"
        });
    }

    if(seatsRequired > movie.totalcapacity){
        res.status(400).json({
            message : "No seats Available at the Moment "
        })
        return;
    }
    if(selectedSeats.length !== seatsRequired){
        res.status(400).json({
            message : "The Seats reserved is more than the required !!"
        })
        return;
    }
    const seen : String [] = [];
    for(let i = 0; i< selectedSeats.length;i++){
        for(let j = 0; j < seen.length;j++){
            if(selectedSeats[i] === seen[j]){
                res.status(400).json({
                    message : "The Seat is Entered more than one Time !"
                })
                return;
            }
        }
        seen.push(selectedSeats[i]);
    }

    const totalPrice = movie.ticketprice * seatsRequired 

    for(let i = 0 ; i < selectedSeats.length; i++){
        if(movie.selectedSeats.includes(selectedSeats[i])){
            res.status(400).json({
                message : "The seats are already reserved"
            })
            return;
        }
    }
    movie.selectedSeats.push(...selectedSeats)
    movie.totalcapacity -= seatsRequired
    const update = await movie.save()

    const book = await Booking.create({
        userId,
        showtimeId,
        hallNumber : movie.hallnumber,
        seatsRequired,
        selectedSeats,
        totalPrice
    })

    res.status(200).json({
        message : "Reservation done successfully :) The Total Price is ",
        totalPrice,
        update,
    })
    }catch(error){
        res.status(500).json({
            message : "Something Went Wrong !",
            error,
        })
    }
}


export const cancel = async (req:Request,res:Response)=>{
    try{
        const deleted = await Booking.findByIdAndDelete(req.params.id)
        if(!deleted){
            res.status(400).json({
                message : "Id is Wrong !"
            })
        }
        res.status(200).json({
            message : "Booking cancelled successfully !"
        })
    }catch(error){
        res.status(500).json({
            message : "Something Went Wrong !",
            error,
        })
    }
}
export const cancelBooking = async (req: Request, res: Response) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        const showtime = await Showtime.findById(booking.showtimeId);

        if (!showtime) {
            return res.status(404).json({
                message: "Showtime not found"
            });
        }

        const movieStart = new Date(
            `${showtime.date} ${showtime.startTime}`
        );

       if (new Date() >= movieStart) {
    return res.status(400).json({
        message: "Booking cannot be canceled after the movie starts"
    });
}

// Release the reserved seats
showtime.selectedSeats = showtime.selectedSeats.filter(
    (seat) => !booking.selectedSeats.includes(seat)
);

// Return the seats to the available capacity
showtime.totalcapacity += booking.seatsRequired;

await showtime.save();

// Cancel the booking
booking.status = "canceled";

await booking.save();

        return res.status(200).json({
            message: "Booking canceled successfully",
            booking
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to cancel booking"
        });
    }
};