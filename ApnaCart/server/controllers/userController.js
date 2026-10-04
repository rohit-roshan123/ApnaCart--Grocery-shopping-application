import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register user
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


// login user

export const login = async (req, res)=>{

    try{

        const { email, password } = req.body;

        if(!email || !password){
            return res.json({success: false, message: "Both email and password are required"})
        }

        const user = await User.findOne({email});

        if(!user){
            return res.json({success: false, message: "invalid email or password"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({success: false, message: "invalid password"})
        }


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



export const isAuth = async(req,res)=>{

    try{
        const { userId } = req;
        const user = await User.findById(userId).select("-password")
        return res.json({success:true, user})

    }
    catch(error){
        res.json({success:false, message:error.message});
    }
}

export const logout = async (req , res)=>{

    try{

        res.clearCookie('token',{
            httpOnly:true,
            secure:false,
            sameSite:'strict'
        }
        )
        res.json({success: true, message: "logged Out"})


    }
    catch(error){

        console.log("here");
        res.json({success:false, message:error.message});

    }




}