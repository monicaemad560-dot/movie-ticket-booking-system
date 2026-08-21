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