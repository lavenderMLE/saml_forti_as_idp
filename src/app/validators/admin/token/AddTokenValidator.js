import * as Yup from 'yup';
import { defaultResponse, validateValue , validateParams } from '../../../common/DefaultValidation';
import AppError from '../../../utils/AppError';
import validator from 'validator' ;


export default async (req, res, next) => {
    try {
        
        const isValidateParams = await validateParams(10 , req , res) ;

        if(!isValidateParams){
            return res
                .status(400)
                .json({
                    error : "Parameters failed" ,
                    message : "overflow parameters"
                })
        }
        
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            symbol: Yup.string().required(),
            decimal : Yup.number().required(),
            pair : Yup.string().required(),
            token_address : Yup.string().required(),
            website_url : Yup.string().required(),
            issuer : Yup.string().required(),
            email : Yup.string().required(),
            deposit_fee : Yup.number().required(),
            transfer_fee : Yup.number().required()
        });

        let is_exist_logo = false ;
        let is_exist_paper = false ;

        for(let [key, value] of Object.entries(req.files)){
            if(value[0].fieldname === 'logo'){
                is_exist_logo = true;
                if (    value[0].mimetype !== 'image/png'  &&
                        value[0].mimetype !== 'image/jpg'  &&
                        value[0].mimetype !== 'image/jpeg' &&
                        value[0].mimetype !=='image/gif' 
                ){
                    new AppError((400 , 'logo' , 'Logo image is not image type.'), req, res, next);
                }
            }
            if(value[0].fieldname === 'paper'){
                is_exist_paper = true ;
                if (    value[0].mimetype !== 'application/pdf' ){
                    return next(new AppError(400 , 'whitepaper' , 'Whitepaper is not pdf type.'), req, res, next);
                }
            }
        }

        if(!is_exist_logo || !is_exist_paper){
            return next(new AppError(400 , 'logo or whitepaper' , 'Logo or Whitepaper is not uploaded.'), req, res, next);
        }

        await validateValue(schema, req.body);

        if(!validator.isURL(req.body.website_url)){
            return next(new AppError(400, 'website url', 'Website url is invalid.'), req, res, next) ;
        }

        if(!validator.isEthereumAddress(req.body.token_address)){
            return next(new AppError(400 , 'token address', 'Token address is invalid.'), req, res, next) ;
        }
        
        return next();

    } catch (error) {
        return defaultResponse(res, error);
    }
};