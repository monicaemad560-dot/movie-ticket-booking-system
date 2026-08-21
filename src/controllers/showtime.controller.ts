import { Request, Response } from "express";
import { Showtime } from "../models/showtime.model.js";

export const createShowtime = async (req: Request, res: Response) => {
    try {
        const showtime = new Showtime(req.body);
        await showtime.save(); // Save the new showtime to the database
        res.status(201).json(showtime);
    } catch (error) {
        res.status(400).json({ msg : "An unknown error occurred" });
    }}

    export const getShowtimeById = async (req: Request, res: Response) => {
    try {
        const showtime = await Showtime.findById(req.params.id);
        if (!showtime) {
            return res.status(404).json({ msg: "Showtime not found" });
        }
        res.json(showtime); //if you want to return the showtime data as JSON
    } catch (error) {
        res.status(500).json({ msg : "server error occurred" });
    }}

    export const updateShowtime = async (req: Request, res: Response) => {
    try {
        const showtime = await Showtime.findByIdAndUpdate(req.params.id, req.body, { new: true }); // { new: true } returns the updated document
        if (!showtime) {
            return res.status(404).json({ msg: "Showtime not found" });
        }
        res.json(showtime);
    } catch (error) {
        res.status(500).json({ msg : "server error occurred" });
    }}  

    export const deleteShowtime = async (req: Request, res: Response) => {
    try {
        const showtime = await Showtime.findByIdAndDelete(req.params.id);
        if (!showtime) {
            return res.status(404).json({ msg: "Showtime not found" });
        }
        res.json({ msg: "Showtime deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg : "An unknown error occurred" });
    }}

    export const getAllShowtimes = async (req: Request, res: Response) => {
    try {
        const showtimes = await Showtime.find(); 
        res.json(showtimes);
    } catch (error) {
        res.status(500).json({ msg : "An unknown error occurred" });
    }}  