import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel,{Showtime} from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { AuthRequest } from "../middleware/auth.middleware.js";
// POST /auth/register
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fullName, email, password, role } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "Email already registered." });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            fullName,
            email,
            password: hashedPassword,
            role: role || "Customer"
        });

        const token = generateToken(newUser._id.toString(), newUser.role);

        res.status(201).json({
            message: "User registered successfully.",
            token,
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// POST /auth/login
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid email or password." });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid email or password." });
            return;
        }

        const token = generateToken(user._id.toString(), user.role);

        res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


export const getAll = async (req:Request,res:Response)=>{
    try{
        const all = await Showtime.find();
        res.status(200).json(all)
    }catch(error){
        res.status(500).json({
            message : "Something Went Wrong !"
        })
    }
} 

export const reservation = async(req:Request,res:Response)=>{
    try{
        const {movieId, seatsRequired,selectedSeats} = req.body
    if(!movieId || !seatsRequired || !selectedSeats){
        res.status(400).json({
            message : "Some Information Misssing"
        })
        return;
    }
    const movie = await Showtime.findOne({movieId})
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

    const seats = await Showtime.find({
        selectedSeats : {$in : selectedSeats} 
    })
    if(seats.length > 0){
        res.status(400).json({
            message : "The Seats are already reserved"
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
    const update = await Showtime.findOneAndUpdate(
        {movieId},
        {
            $inc : {
                totalcapacity: - seatsRequired
            },
            $addToSet:{
                selectedSeats:{
                    $each: selectedSeats
                }
            }
        },
        {new : true}
    )
    res.status(200).json({
        message : "Reservation done successfully :) The Total Price is ",
        totalPrice,
        update,
    })
    }catch(error){
        res.status(500).json({
            message : "Something Went Wrong !"
        })
    }
}