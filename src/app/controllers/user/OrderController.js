import ControllerUtils from '../../utils/ControllerUtils' ;
import SchemaService from '../../services/SchemaService' ;

import UserSchema from "../../schemas/UserSchema";
import OrderSchema from '../../schemas/OrderSchema';

import AppError from '../../utils/AppError';
import SendMail from '../../utils/SendMail';
import { formatDBDate } from '../../utils/Helper';
import BalanceSchema from '../../schemas/BalanceSchema';

class OrderController extends ControllerUtils {
  
    constructor() {
        super() ;

        this.Users = new SchemaService(UserSchema);
        this.Orders = new SchemaService(OrderSchema);
        this.Balances = new SchemaService(BalanceSchema);
        
        // if you are not defined this, you will use signUp function but you can't use async and await.

        this.getInfo = this.getInfo.bind(this);
        this.buy = this.buy.bind(this);
        this.sell = this.sell.bind(this);
        this.setDeposit = this.setDeposit.bind(this);
        this.setWithdraw = this.setWithdraw.bind(this);
    }

    async getInfo(req, res, next) {
      let balance = await this.Balances.findOne({
        user_id : req.user._id
      });

      if(!balance) return next(new AppError(403, 'getinfo', 'user is invalid'));

      return res.status(200).json({
        userInfo : balance
      })
    }

    async buy(req, res, next) {

      let balance = await this.Balances.findOne({
        user_id : req.user._id
      });
      if(!balance) return next(new AppError(403, 'orderBuy', 'user is invalid'));

      const totalBalance = balance.balance - req.body.price;
      
      await this.Balances.update(balance, {balance : totalBalance});

      let user = await this.Balances.findOne({_id : req.user._id});

      return res.status(200).json({
        userInfo : user
      })
    }

    async sell(req, res, next) {
      
      let balance = await this.Balances.findOne({
        user_id : req.user._id
      });
      
      if(!balance) return next(new AppError(403, 'orderSell', 'user is invalid'));

      let commition = req.body.price / 100 * 0.26;
      let totalCommition = balance.commition + commition;
      const totalBalance = balance.balance + req.body.price + commition;

      await this.Balances.update(balance, {balance : totalBalance, commition : totalCommition});

      balance = await this.Balances.findOne({user_id : req.user._id});

      return res.status(200).json({
        userInfo : balance
      })
    }

    async setDeposit(req, res, next) {
      console.log(req.body.data);
      let currentbalance = await this.Balances.findOne({
        user_id : req.user._id
      });

      if(!currentbalance) return next(new AppError(403, 'getinfo', 'user is invalid'));

      let totalDepositAmount = currentbalance.deposit_amount + req.body.data;
      const totalBalance = currentbalance.balance + req.body.data;
      await this.Balances.update(currentbalance, {deposit_amount : totalDepositAmount, balance : totalBalance});

      return res.status(200).json({
        status : 'success'
      })
    }

    async setWithdraw(req, res, next) {
      let currentbalance = await this.Balances.findOne({
        user_id : req.user._id
      });

      if(!currentbalance) return next(new AppError(403, 'getinfo', 'user is invalid'));

      let totalWithdrawAmount = currentbalance.withdraw_amount + req.body.data;
      let totalBalance = currentbalance.balance - req.body.data;
      await this.Balances.update(currentbalance, {withdraw_amount : totalWithdrawAmount, balance : totalBalance});

      return res.status(200).json({
        status : 'success'
      })
    }
}
  
export default new OrderController();