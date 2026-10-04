import jwt from 'jsonwebtoken';


const authSeller = async ()=>{

    const { sellertoken } = req.cookies;
    
        if(!sellertoken){
            return res.json({success: false, message: 'not authorized'});     
        }
    
        try{
    
            const tokenDecode = jwt.verify(sellertoken,"anytext");
    
            if(tokenDecode.email === "apnacart@gmail.com"){
                
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