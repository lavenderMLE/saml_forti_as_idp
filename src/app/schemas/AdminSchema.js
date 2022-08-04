import { Schema , model } from "mongoose";
import mongoose from 'mongoose' ;

const AdminSchema = new Schema({
    email : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },


} , { timestamps: true }) ;

export default model('Admin' , AdminSchema) ;