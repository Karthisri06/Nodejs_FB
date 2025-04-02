import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction):Promise<void>=> {
    const token = req.headers.authorization?.split(" ")[1];
    try {
    if (!token) {
        res.status(403).json({ message: "Access denied. No token provided." });
        return 
    }

        const decoded = jwt.verify((token) as any, (process.env.JWT_SECRET)as any);
        // req.user = decoded; // Add the decoded user data to the request object
        //  next() // Allow access to the next middleware or route
        res.status(200).json({message:"Valid token",data:decoded})
    } catch (error) {
        res.status(401).json({ message: error });
        return 
    }
};

