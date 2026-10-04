

// register user

import User from "../models/User.js";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

export const register = async (req,res) => {
    try{

        const { name , email, password } = req.body;

        if(!name || !email || !password){

            return res.json({success: false, message:"missing details"})
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.json({success: false, message:"user already exists"})
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const user = await User.create({name, email, password: hashedpassword});

        const token = jwt.sign({id: user._id}, "anytext", {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,    // env variable
            sameSite: 'strict',   // env variable
            maxAge: 7*24*60*60*1000
        })

        return res.json({success: true, user:{email: user.email, name: user.name}})

    }
    catch(error){
        res.json({success: false, message: error.message});

    }

}