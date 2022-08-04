import express from 'express';
import passport from 'passport' ;

// controllers
import BalanceController from '../../app/controllers/user/BalanceController';

const router = express.Router() ;

router.post('/*' , passport.authenticate('jwt', { session: false }));

router.post('/setbalanceinfo' , BalanceController.setBalanceInfo) ;
router.post('/getInfo' , BalanceController.getInfo) ;


export default router;