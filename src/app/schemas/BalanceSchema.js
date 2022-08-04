import { Schema , model } from "mongoose";
import mongoose from 'mongoose' ;

const BalanceSchema = new Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    deposit_amount : {
        type : Number,
        default : 0
    },

    withdraw_amount : {
        type : Number,
        default : 0
    },

    balance : {
        type : Number,
        default : 0
    },

    commition : {
        type : Number,
        default : 0
    },

    complete : {
        type : Number,
        default : 0
    },
    
    cancel : {
        type : Number,
        default : 0
    },

} , { timestamps: true }) ;

export default model('Balance' , BalanceSchema) ;