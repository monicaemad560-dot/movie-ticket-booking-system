import { Request, Response } from "express";
import { Booking } from "../models/booking.model.js";
import { Showtime } from "../models/showtime.model.js";

export const getAll = async (req:Request,res:Response)=>{
    try{
        const all = await Booking.find();
        res.status(200).json(all)
    }catch(error){
        res.status(500).json({
            message : "Something Went Wrong !"
        })
    }
} 

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