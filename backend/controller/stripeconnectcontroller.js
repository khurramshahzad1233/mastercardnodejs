import catchasyncerror from "../middleware/catchasyncerror.js";
import Errorhandler from "../utils/errorhandler.js"
import dotenv from "dotenv"
if(process.env.NODE_ENV!=="PRODUCTION"){
    dotenv.config({path:"backend/config.env"})
};
import axios from "axios";

            
export const mastercardsessionid=catchasyncerror(async(req,res,next)=>{
    const {returnurl,amount,currency,orderid,description}=req.body;

    if(!returnurl ||!amount ||!currency ||!orderid ||!description){
        return next(new Errorhandler("missing require parameter, try again please", 400))
    }

    const merchantId=process.env.merchantid;
    if(!merchantId){
        return next(new Errorhandler("merchant id is missing",400))
    }
    const passWord=process.env.password;
    if(!passWord){
        return next(new Errorhandler("api password is missing", 400))

    }
    
    
    const base64Credentials=Buffer.from(`merchant.${merchantId}:${passWord}`).toString(`base64`);
    

    const authHeader = {
        Authorization:`Basic ${base64Credentials}`,
        "Content-Type": "application/json",
      };
    
    
    const paymentData=await axios.post("https://nbm.gateway.mastercard.com/api/rest/version/75/merchant/ITINERTRIP01/session",{
        
            apiOperation:"INITIATE_CHECKOUT",
            interaction:{
                operation:"PURCHASE",
                returnUrl:returnurl+orderid,
                merchant:{
                    name:"ITINERTRIP",
                    url:"https:/itinertrip.com//"
                }
        
            },
            order:{
                amount:amount,
                currency:currency,
                id:orderid,
                description:description,
            }
        
    },
    
    {
        headers: authHeader
    }
    );
    const sessionId=paymentData.data.session.id;

    res.status(200).json({
        success:true,
        sessionId,
    
    })
    

    
});



export const getordercontroller=catchasyncerror(async(req,res,next)=>{

    const {orderid}=req.body;
    if(!orderid){
        return next(new Errorhandler("missing orderid, try again please", 400))
    }
    const merchantId=process.env.merchantid;
    if(!merchantId){
        return next(new Errorhandler("merchant id is missing",400))
    }
    const passWord=process.env.password;
    if(!passWord){
        return next(new Errorhandler("api password is missing", 400))

    }
    
    
    const base64Credentials=Buffer.from(`merchant.${merchantId}:${passWord}`).toString(`base64`);
    

    const authHeader = {
        Authorization:`Basic ${base64Credentials}`,
        "Content-Type": "application/json",
      };

      const orderdata=await axios.get(`https://nbm.gateway.mastercard.com/api/rest/version/75/merchant/ITINERTRIP01/order/${orderid}`,{
        headers:authHeader
      });

      const orderId=orderdata.data.id;
      const orderstatus=orderdata.data.status;
      const orderamount=orderdata.data.amount;
      const currency=orderdata.data.currency;

      res.status(200).json({
        success:true,
        orderstatus,
        orderamount,
        currency,

        orderId,
      })

})



        