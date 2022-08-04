import { Schema , model } from "mongoose";
import mongoose from 'mongoose' ;

const RecipientSchema = new Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    type : {
        type : String,
        enum : ['business','customer'],
        default : 'business'
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    street_address : {
        type : String,
        required : true
    },
    city_town : {
        type : String,
        default : null,
    },
    country : {
        type : String,
        required : true
    },
    phone_number : {
        type : String,
        default : null
    },
    gender : {
        type : String,
        enum : ['female','male'],
        default : 'female',
        required : true,
    },
    bank_name : {
        type : String,
        required : true,
    },
    account_number : {
        type : String,
        required : true,
    },
    swift_code : {
        type : String,
        default : null,
    },
    account_type : {
        type : String,
        enum : ['savings','checkings'],
        default : 'savings',
        required : true,
    },
    delivery_option : {
        type : String,
        required : true,
    },
    partner : {
        type : String,
        required : true,
    }
} , { timestamps: true }) ;

export default model('Recipient' , RecipientSchema) ;