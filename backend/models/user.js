import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
    {
        _id: { type: String, default: uuidv4 },
        name: {
          type: String,
          required: [true, 'Please provide your name'],
        },
        email: {
          type: String,
          required: [true, 'Please provide a valid email'],
        },
        password: {
          type: String,
          required: [true, 'Please provide a password'],
          select: false,
        },
        role: {
          type: String,
          enum: {
            values: ['user', 'admin'],
            message: 'Please select your role',
          },
          default: 'user',
        },
      },
      {
        timestamps: true,
      }
    )
    
    userSchema.pre('save', function (next) {
      if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 12)
      }
      next()
    })
    
    userSchema.methods.comparePassword = async function (enterPassword) {
      return bcrypt.compareSync(enterPassword, this.password)
    }
    
    userSchema.methods.jwtToken = function () {
      const user = this
      return jwt.sign({ id: user._id }, 'random string', {
        expiresIn: '1h',
      })
    }
    

const User = mongoose.model('user', userSchema);

export default User;