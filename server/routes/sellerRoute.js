import express from 'express';
import { sellerLogin, checkSellerLogin, sellerLogout } from '../controllers/SellerController.js';
import authSeller from '../middlewares/authSeller.js';

const sellerRouter = express.Router();


sellerRouter.post('/login/', sellerLogin);
sellerRouter.get('/check-login/', authSeller ,checkSellerLogin);
sellerRouter.get('/logout/', sellerLogout);

export default sellerRouter;