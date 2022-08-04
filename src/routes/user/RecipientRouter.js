import express from 'express';
import passport from 'passport' ;

// controllers
import RecipientController from '../../app/controllers/user/RecipientController';

// validators
import AddRecipientValidator from '../../app/validators/user/recipient/AddRecipientValidator';

const router = express.Router() ;


router.post('/*' , passport.authenticate('jwt', { session: false }));

router.post('/getAll' , RecipientController.GetAllRecipient) ;
router.post('/add' , [AddRecipientValidator] , RecipientController.AddRecipient) ;

export default router;