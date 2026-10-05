import jwt from 'jsonwebtoken';

// login seller : /api/seller/login

export const sellerLogin = async(req,res)=>{

    try{
    const {email, password} = req.body;

    if(password === "apnacart123" && email=== "apnacart@gmail.com"){
        const token = jwt.sign({email}, "anytext", {expiresIn: '7d'});
    

    res.cookie('sellertoken', token, {
            httpOnly: true,
            secure: false,    // env variable
            sameSite: 'strict',   // env variable
            maxAge: 7*24*60*60*1000
        });

    return res.json({success: true, message: "Loggin In"});

    }
    else{

        return res.josn({success: false, message: "invalid credentials"});

    }

}
catch(error){

    res.json({success:false, message:error.message});
}

    

    






}