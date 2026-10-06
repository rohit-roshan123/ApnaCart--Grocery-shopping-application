import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectdb from './configuration/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configuration/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();

const port = process.env.PORT || 4000;

await connectCloudinary();


// urls of applications to communicate with backend
const allowedOrigins = ['http://localhost:5173']


// middle-wares configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}))

app.get('/', (req,res)=>{

    res.send("api is working")

});

app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);



app.listen(port, async ()=>{

    await connectdb()
    
    console.log(`server is running on port ${port}`)
})


