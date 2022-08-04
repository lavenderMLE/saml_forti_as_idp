import ControllerUtils from '../../utils/ControllerUtils' ;
import SchemaService from '../../services/SchemaService' ;

import UserSchema from "../../schemas/UserSchema";
import RecipientSchema from '../../schemas/RecipientSchema';

import AppError from '../../utils/AppError';
import SendMail from '../../utils/SendMail';
import { formatDBDate } from '../../utils/Helper';

class RecipientController extends ControllerUtils {
  
    constructor() {
        super() ;

        this.Users = new SchemaService(UserSchema);
        this.Recipients = new SchemaService(RecipientSchema);
        
        // if you are not defined this, you will use signUp function but you can't use async and await.

        this.AddRecipient = this.AddRecipient.bind(this);
    }

    async GetAllRecipient(res, next) {
        let recipients = await this.Recipients.find({});

        if(!recipients.length) return next(new AppError(403, 'getAllRecipient', 'recipients does not exist'));
        
        let recipientList = [];

        for(let recipient of recipients){
            recipientList.push({
                name : recipient.name,
                country : recipient.country,

            })
        }
    }

    async AddRecipient(req, res, next) {
      
        let recipient = await this.Recipients.findOne({
          email : req.body.email,
          type : req.body.type
        });
        
        if(recipient) return next(new AppError(403, 'addRecipient', 'recipient already exist'));

        recipient = await this.Recipients.store({
            ...req.body,
        });

        if(!recipient) return next(new AppError(403, 'addRecipient', 'recipient create failed'));

      return res.status(200).json({
        status : 'success'
      })
    }

}
  
export default new RecipientController();