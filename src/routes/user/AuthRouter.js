import express from 'express';
import passport from 'passport' ;

// controllers
import AuthController from '../../app/controllers/user/AuthController';

// validators
import SignInValidator from '../../app/validators/user/auth/SignInValidator';

const router = express.Router() ;

router.post('/signin' , [SignInValidator] , AuthController.signIn) ;

router.post('/*' , passport.authenticate('jwt', { session: false }));
 

export default router;