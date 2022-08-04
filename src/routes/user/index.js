import { Router } from 'express';
import AuthRouter from './AuthRouter' ;
import RecipientRouter from './RecipientRouter';
import OrderRouter from './OrderRouter';

const routes = new Router();

routes.use('/auth' , AuthRouter) ;
routes.use('/recipient' , RecipientRouter);
routes.use('/order', OrderRouter);
  
export default routes;