import { Schema , model } from "mongoose";
import mongoose from 'mongoose' ;

const OrderSchema = new Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    available_balance : {
        type : String,
        required : true
    },
} , { timestamps: true }) ;

export default model('Order' , OrderSchema) ;