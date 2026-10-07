import jwt from 'jsonwebtoken';

// login seller : /api/seller/login

export const sellerLogin = async(req,res)=>{

    try{
    const {email, password} = req.body;

    if(password === process.env.seller_password && email=== process.env.seller_email){
        const token = jwt.sign({email}, process.env.jwt_secret, {expiresIn: '7d'});
    

    res.cookie('sellertoken', token, {
            httpOnly: true,
            secure: process.env.node_env === "production"?true:false,    // env variable
            sameSite: process.env.node_env === "production"? 'none':'strict',   // env variable
            maxAge: 7*24*60*60*1000
        });

    return res.json({success: true, message: "Loggin In"});

    }
    else{

        return res.json({success: false, message: "invalid credentials"});

    }

}
catch(error){

    res.json({success:false, message:error.message});
}

}


export const isSellerAuth = async(req,res)=>{

    try{
        
        return res.json({success:true})
    }
    catch(error){
        res.json({success:false, message:error.message});
    }
}


export const sellerLogout = async (req , res)=>{

    try{
      res.clearCookie('sellertoken',{
            httpOnly:true,
            secure:process.env.node_env === "production"?true:false,
            sameSite:process.env.node_env === "production"? 'none':'strict'
        }
        )
        res.json({success: true, message: "logged Out"})
    }
    catch(error){

        console.log("hi");

        res.json({success:false, message:error.message});

    }
}