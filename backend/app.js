import express from "express";
import Errormiddleware from './middleware/error.js'
import mastercard from "./routes/stripeconnectroute.js"
// import path from "path"
import cors from "cors"
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.use('/api',mastercard);

// app.use(express.static(path.join(__dirname,"../itinertip/build")));
// app.get("*",(req,res)=>{
//     res.sendFile(path.resolve(__dirname,"../itinertrip/build/index.html"))
// })

app.use(Errormiddleware)
export default app;