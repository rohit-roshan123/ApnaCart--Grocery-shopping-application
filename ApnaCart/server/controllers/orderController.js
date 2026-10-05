import Order from "../models/Order.js";
import Product from "../models/Product.js";


export const placeOrderCOD = async (req,res)=>{

    try{

        const { items , address } = req.body;

        if(!address || items.length === 0){
            return res.json({success: false, message:"invalid  data"})
        }

        let amount  = await items.reduce(async (acc, item)=>{
            const product = await Product.find(item.product);
            return (await acc) + product.offerPrice* item.quantity;

        }, 0)

        amount = amount + Math.floor(amount * 0.02);

        await Order.create({
            userId: req.userId,
            items,
            amount,
            address,
            paymentType: "COD",
        });

        return res.json({success:true, message:"order placed successfully"})
    }
    catch(error){

        console.log(error);
        res.json({success: false, message: error.message})
    }
}

export const getUserOrders = async(req,res)=>{

    try{

        const { userId }  = req;

        const orders = await Order.find({userId,
            $or: [{paymentType: "COD"},{isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});

        res.json({success: true, orders});
    }
    catch(error){

        console.log();
        res.json({success: false, message: error.message});

    }
}