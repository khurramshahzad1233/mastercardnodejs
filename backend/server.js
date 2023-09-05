import app from "./app.js"
import dotenv from "dotenv"

if(process.env.NODE_ENV!=="PRODUCTION"){
    dotenv.config({path:"backend/config.env"})
};



app.listen(process.env.port,()=>{
    console.log(`server is running on port ${process.env.port}`)
})