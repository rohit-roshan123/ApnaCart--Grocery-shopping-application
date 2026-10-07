import jwt from 'jsonwebtoken';


const authSeller = async (req,res,next)=>{

    const { sellertoken } = req.cookies;
    
        if(!sellertoken){
            return res.json({success: false, message: 'not authorized'});     
        }
    
        try{
    
            const tokenDecode = jwt.verify(sellertoken, process.env.jwt_secret);
    
            if(tokenDecode.email === process.env.seller_email){
                
                next();
            }
            else{
                return res.json({success: false, message: 'not authorized'});
            }
    
        }
        catch(error){
    
            res.json({success:false, message:error.message })
            
        }
}

export default authSeller;