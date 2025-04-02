import { NextFunction,request,response } from "express";

export const errorHandler=(
    error:Error,
    req:Request,
    res:Response,
    next:NextFunction
) => {
    console.error(`Error:${error.message}`);
    return ;
};