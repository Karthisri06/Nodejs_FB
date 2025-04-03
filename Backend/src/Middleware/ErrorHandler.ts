// import { NextFunction,request,response } from "express";

// export const errorHandler=(
//     error:Error,
//     req:Request,
//     res:Response,
//     next:NextFunction
// ) => {
//     console.error(`Error:${error.message}`);
//     return ;
// };

import {Request,Response,NextFunction} from 'express';

export const errorHandler=(err:any , req:Request ,res:Response , next:NextFunction) =>{
    console.error(err.stack);

    const statusCode=err.statusCode||500;
    const message=err.message||'Internal server error'

    res.status(statusCode).json({
        success:false,
        message,
        ...(process.env.NODE_ENV === 'development'&&{stack:err.stack})
    })
}