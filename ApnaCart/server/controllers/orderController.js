import Order from "../models/Order.js";
import Product from "../models/Product.js";


export const placeOrderCOD = async (req,res)=>{

    try{

        const { items , address } = req.body;

        if(!address || items.length === 0){
            return res.json({success: false, message:"invalid  data"})
        }

        let amount  = await items.reduce(async (acc, item)=>{
            const product = await Product.findById(item.product);
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



export const placeOrderStripe = async (req,res)=>{

    try{

        const { items , address } = req.body;

        const {origin} = req.headers;

        if(!address || items.length === 0){
            return res.json({success: false, message:"invalid  data"})
        }

        let products = [];

        let amount  = await items.reduce(async (acc, item)=>{
            const product = await Product.findById(item.product);
            products.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity
            })
            return (await acc) + product.offerPrice* item.quantity;

        }, 0)

        amount = amount + Math.floor(amount * 0.02);

        const order = await Order.create({
            userId: req.userId,
            items,
            amount,
            address,
            paymentType: "Online",
        });

        // stripe gateway initialize

        const stripeInstance = new stripe(process.env.stripe_secret_key);

        const line_items = products.map((item)=>{

            return {
                price_data:{
                    currency: "usd",
                    product_data:{
                        name: item.name,
                    },
                    unit_amount: Math.floor(item.price + item.price*0.02)*100
                },
                quantity: item.quantity,
            }
        })

        // create session 

        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata:{
            orderId: order._id.toString(),
            userId: req.userId
            }

        })

        return res.json({success:true, url:session.url});
    }
    catch(error){

        console.log(error);
        res.json({success: false, message: error.message})
    }
}


export const stripeWebHook = async(req,res)=>{

    const stripeInstance = new stripe(process.env.stripe_secret_key);

    const sig = req.headers["stripe-signature"];

    let event;

    try{

        event = stripeInstance.webhooks.constructEvent(

            req.body,
            sig,
            process.env.stripe_webhook_secret
        )

    }
    catch(error){
        res.status(400).send(`webhook error: ${error.message}`)
    }

    switch(event.type){
        case "payment_intent.succeeded":{
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            const session = await stripeInstance.checkout.sessions.list({
                payment_Intent: paymentIntentId,
            });

            const {orderId, userId }= session.data[0].metadata;

            await Order.findByIdAndUpdate(orderId, {isPaid: true})

            await User.findByIdAndUpdate(userId, {cartItems: {}});
            break;
        }

        case "payment_intent.payment_failed":{

            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            const session = await stripeInstance.checkout.sessions.list({
                payment_Intent: paymentIntentId,
            });

            const {orderId}= session.data[0].metadata;

            await Order.findByIdAndDelete(orderId);
            break;
        }

        default:
            console.error(`unhandled event type ${event.type}`);
            break;
    }
    res.json({received:true});
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

export const getAllOrders = async(req,res)=>{

    try{
        const orders = await Order.find({
            $or: [{paymentType: "COD"},{isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});

        res.json({success: true, orders});
    }
    catch(error){
        console.log();
        res.json({success: false, message: error.message});

    }
}