import express from 'express';
import { createUser,loginUser,userProfile,logOut } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middleware/auth.js';


const authRouter = express.Router()

// Routes created

authRouter.post('/register', createUser)
authRouter.post('/login', loginUser)
authRouter.get('/me', isAuthenticated, userProfile)
authRouter.post('/logout', isAuthenticated, logOut)

export default authRouter;