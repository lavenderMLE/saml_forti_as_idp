import { Router } from 'express';
import AuthRouter from './AuthRouter' ;
import BalanceRouter from './BalanceRouter' ;

const routes = new Router();

routes.use('/auth' , AuthRouter) ;
routes.use('/balance' , BalanceRouter) ;
  
export default routes;