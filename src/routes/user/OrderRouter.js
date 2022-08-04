import express from 'express';
import passport from 'passport' ;

// controllers
import OrderController from '../../app/controllers/user/OrderController';

// validators
import AddCustomerValidator from '../../app/validators/user/customer/AddCustomerValidator';

const router = express.Router() ;


router.post('/*' , passport.authenticate('jwt', { session: false }));
 
// router.post('/add' , [AddCustomerValidator] , CustomerController.AddCustomer) ;
router.post('/buy' , OrderController.buy) ;
router.post('/sell' , OrderController.sell) ;
router.post('/getInfo' , OrderController.getInfo) ;
router.post('/deposit' , OrderController.setDeposit) ;
router.post('/withdraw' , OrderController.setWithdraw) ;

export default router;