import * as Yup from 'yup';
import { defaultResponse, validateValue , validateParams } from '../../../common/DefaultValidation';


export default async (req, res, next) => {
    try {
        
        const isValidateParams = await validateParams(16 , req , res) ;

        if(!isValidateParams){
            return res
                .status(202)
                .json({
                    error : "Parameters failed" ,
                    message : "overflow parameters"
                })
        }

        const schema = Yup.object().shape({
            name : Yup.string().required(),
            email : Yup.string().required(),
            street_address : Yup.string().required(),
            city_town : Yup.string().required(),
            country : Yup.string().required(),
            phone_number : Yup.string().required(),
            gender : Yup.string().required(),
            birth_month : Yup.string().required(),
            birth_day: Yup.string().required(),
            birth_year : Yup.string().required(),
            bank_name : Yup.string().required(),
            account_number : Yup.string().required(),
            swift_code : Yup.string().required(),
            account_type : Yup.string().required(),
            delivery_option : Yup.string().required(),
            partner : Yup.string().required(),
        });

        await validateValue(schema, req.body);
        
        return next();

    } catch (error) {
        return defaultResponse(res, error);
    }
};