import User from "../models/user.js";
import { validateUserLogin,validateUserSignup } from "../validators/user.validators.js";



export const createUser = async (req, res) => {
    try {
      const { error } = validateUserSignup(req.body); // Validate the information from the request body
  
      if (error) {
        return res.status(400).json({ message: error.message });
      }
  
      const { name, email, password, role } = req.body;
  
      // Check if the user already exists
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create a new user
      const user = await User.create({ name, email, password, role });
  
      if (!user) {
        return res.status(400).json({ message: 'Cannot create user' });
      }
  
    //   const token = await user.generateJwtToken(); // Assuming you have a method for generating a JWT token
  
    //   const options = {
    //     maxAge: 300000, // 300 seconds (5 minutes)
    //     httpOnly: true,
    //   };
  
    //   res.cookie('token', token, options);
      
      return res.status(200).json({
        message: 'Signup successful',
        
      });
    } catch (error) {
      console.error('Unable to create a User', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const loginUser = async (req, res) => {
    try {
      const { err } = validateUserLogin(req.body)
      if (err) return res.status(400).json({ message: err.message }) // Validate the users input
  
      // find the email of the user
      const user = await User.findOne({ email: req.body.email }).select(
        '+password'
      )
      // console.log(user)
  
      const isMatched = await user.comparePassword(req.body.password)
      if (!isMatched)
        return res.status(400).json({ message: 'Incorrect password or email' })
  
      const token = await user.jwtToken()
  
      const options = {
        httpOnly: true,
      }
  
      return res.status(200).cookie('token', token, options).json({
        message: 'Login successful',
        token,
      })
    } catch (error) {
      console.log(error.message)
    }
  }
  
  export const userProfile = async (req, res, next) => {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(200).json({ message: 'User not found' })
    return res.status(200).json({ message: 'Successfully', data: user })
  }
  
  export const logOut = async (req, res) => {
    try {
      res.cookie('token', 'none', {
        expires: new Date(Date.now()),
      })
      return res
        .status(200)
        .json({ success: true, message: 'User is logout successfully' })
    } catch (error) {
      console.log(error.message)
    }
  }