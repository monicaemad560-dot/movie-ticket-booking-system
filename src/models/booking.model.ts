import mongoose, { Schema, Document } from "mongoose";

export const reserve = new Schema({
    userId : {
        type : String,
        required : true
    },
    showtimeId : {
        type : String,
        required : true
    },
    seatsRequired : {
        type: Number,
        required: true
    },
    selectedSeats : {
        type : [String],
        required : true
    },
    hallNumber :{
        type : String,
        required : true
    },
    totalPrice : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum : ["preparing" , "confirmed" , "canceled"],
        default : "preparing",
        required : true
    },
})

export const Booking = mongoose.model("Booking", reserve)