import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';


const app = express();

const port = process.env.PORT || 4000;


// urls of applications to communicate with backend
const allowedOrigins = ['http://localhost:5173']


// middle-wares configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}))

app.get('/', (req,res)=>{

    res.send("api is working")

});

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})


