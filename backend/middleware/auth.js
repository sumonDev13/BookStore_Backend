import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    let token
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }
  
    if (!token) {
      return res.status(401).json({ message: 'User not authorized' })
    }
  
    const decoded = jwt.verify(token, 'random string')
    req.user = await User.findById(decoded.id)
  
    next()
  }