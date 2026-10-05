import {v2 as cloudinary} from 'cloudinary';
import Product from '../models/Product.js';


// add product by seller

export const addProduct = async (req,res)=>{
     
    try{

        let productData = JSON.parse(req.body.productData);

        const images = req.files

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'} );
                return result.secure_url
            })
        )

        await Product.create({...productData, image: imagesUrl});

        res.json({success: true, message: "product added"});

    }
    catch(error){

        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}



export const productList = async (req,res)=>{

    try{

    }
    catch(error){
        
    }



}



export const changeStock = async (req,res)=>{


}