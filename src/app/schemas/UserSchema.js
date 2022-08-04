import { Schema , model } from "mongoose";
import mongoose from 'mongoose' ;

const UserSchema = new Schema({
    email : {
        type : String,
        required : true
    },

    available_balance : {
        type : Number,
        required : true
    },

    is_admin : {
        type : Boolean,
        default : false,
        required : true
    },

} , { timestamps: true }) ;

export default model('User' , UserSchema) ;