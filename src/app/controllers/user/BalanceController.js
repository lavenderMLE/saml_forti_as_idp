import ControllerUtils from '../../utils/ControllerUtils' ;
import SchemaService from '../../services/SchemaService' ;

import UserSchema from "../../schemas/UserSchema";
import BalanceSchema from '../../schemas/BalanceSchema';
import AppError from '../../utils/AppError';

class BalanceController extends ControllerUtils {
  
    constructor() {
        super() ;

        this.Users = new SchemaService(UserSchema);
        this.Balances = new SchemaService(BalanceSchema);
        
        // if you are not defined this, you will use signUp function but you can't use async and await.

        this.getInfo = this.getInfo.bind(this);
        this.setBalanceInfo = this.setBalanceInfo.bind(this);
    }

    async setBalanceInfo(req, res, next) {
      
        for(let user_balance of req.body.updateData) {
            let user = await this.Users.findOne({
                email : user_balance.email
            });
            let balance = await this.Balances.findOne({
                user_id : user._id
            })
            await this.Balances.update(balance, {balance : user_balance.balance});
        }
        
        return res.status(200).json({
            status : "success",
        })
    }

    async getInfo(req, res, next) {
        let userInfo = [];
        let user_balances = await this.Balances.find({});

        for(let user_balance of user_balances) {
            let user = await this.Users.findOne({
                _id : user_balance.user_id,
            })
            userInfo.push({
                email : user.email,
                deposit_amount : user_balance.deposit_amount,
                withdraw_amount : user_balance.withdraw_amount,
                balance : user_balance.balance,
            })
        }

        if(!user_balances) return next(new AppError(401, "getInfo", "No data")) 
        
        return res.status(200).json({
            userInfo : userInfo
        })
    }
}
  
export default new BalanceController();