import express from 'express';
import passport from 'passport' ;

// controllers
import AuthController from '../../app/controllers/user/AuthController';

// validators
import AdminSignInValidator from '../../app/validators/admin/auth/SignInValidator';

const router = express.Router() ;

router.post('/signinadmin' , [AdminSignInValidator] , AuthController.signInAdmin) ;

router.post('/*' , passport.authenticate('jwt', { session: false }));
 

export default router;