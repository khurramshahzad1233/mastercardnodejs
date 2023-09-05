const Errormiddleware=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.message=err.message||"internalserver error";

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    })
};

export default Errormiddleware;