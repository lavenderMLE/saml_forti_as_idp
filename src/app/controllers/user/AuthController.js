import ControllerUtils from '../../utils/ControllerUtils' ;
import SchemaService from '../../services/SchemaService' ;

import UserSchema from "../../schemas/UserSchema";
import AdminSchema from "../../schemas/AdminSchema";

import AppError from '../../utils/AppError';
import SendMail from '../../utils/SendMail';
import { formatDBDate } from '../../utils/Helper';

import passportConfig from '../../../configs/passportConfig';

import bcrypt from 'bcrypt' ;
import jwt from 'jsonwebtoken';
import BalanceSchema from '../../schemas/BalanceSchema';

class AuthController extends ControllerUtils {
  
    constructor() {
        super() ;

        this.Users = new SchemaService(UserSchema);
        this.Admin = new SchemaService(AdminSchema);
        this.Balances = new SchemaService(BalanceSchema);
        // if you are not defined this, you will use signUp function but you can't use async and await.

        this.createPassword =  this.createPassword.bind(this) ;
        this.comparePassword = this.comparePassword.bind(this) ;
        this.confirmUser = this.confirmUser.bind(this) ;
        this.signIn = this.signIn.bind(this) ;
        this.signInAdmin = this.signInAdmin.bind(this) ;
        this.tokenForUser = this.tokenForUser.bind(this);
    }

    async createPassword(password , callback) {
        bcrypt.genSalt(10 , function(err, salt) {
            if(err) return next(new AppError(400 , "fail" , "Generate Salt Failed.")) ;

            bcrypt.hash(password, salt, function(err, hash) {
                if(err) return next(new AppError(400 , "fail" , "Password Hash Failed.")) ;
                else return callback(hash) ;
            });
        })
    }

    async comparePassword(password , db_password , next , callback) {
        bcrypt.compare(password , db_password ,function(err , isMatch) {
            if(err) return next(new AppError(401 , "compare" , "Compare Password Failed."))
            else return callback(isMatch) 
        })
    }

    async tokenForUser(userInfo, next, callback) {
        jwt.sign({user : userInfo} , passportConfig.JWT_SECRET_OR_KEY , {
            expiresIn : passportConfig.JWT_TOKEN_EXPIRATION
        } , function (err , token) {
            if(err) return next(new AppError(401 , "token" , "Provide Token Failed."))
            else return callback(token)
        }) ;
    }

    async signIn(req, res, next) {

        const user = await this.Users.findOne({
            ...req.body,
        });
        
        if(!user) {
            let doc = await this.Users.store({
                ...req.body,
                available_balance : 1000
            });

            await this.Balances.store({
                user_id : doc._id,
            })
        }

        await this.tokenForUser(user , next , async (token) => {
            return res.status(200).json({
                status : "success" ,
                message : "Login Successfully.",
                access_token : token ,
            })
        })

    }

    async signInAdmin(req, res, next) {

        const user = await this.Admin.findOne({
            ...req.body,
        });
   
        if(!user) {
            return next(new AppError(401, "admin", "You are not admin"));
        }

        await this.tokenForUser(user , next , async (token) => {
            return res.status(200).json({
                status : "success" ,
                message : "Login Successfully.",
                access_token : token ,
            })
        })

    }
    
    async confirmUser (req, res, next) {
        const schemaService = new SchemaService(UserSchema) ;

        const user = await schemaService.findOne({
            email : req.body.email, 
            email_verify_code : req.body.email_verify_code
        }) ;

        if(!user) return next(new AppError(401 , "fail" , "Confirm User Failed.") , req, res, next) ;
        
        user.is_verified_email = true ;
        await user.save() ;

        const profile = await schemaService.hasOne({
            email : req.body.email, 
            email_verify_code : req.body.email_verify_code
        } , 'profile_id' ) ;

        await this.tokenForUser(user , next , async (token) => {
            return res.status(200).json({
                status : "success" ,
                message : "Confirm Successfully.",
                access_token : token ,
                is_created_profile : profile.profile_id ? true : false ,
                profile : profile.profile_id ? profile.profile_id : {}
            })
        })
    }

}
  
export default new AuthController();