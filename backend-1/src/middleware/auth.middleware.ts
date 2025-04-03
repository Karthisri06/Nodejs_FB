import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface AuthenticatedRequest extends Request {
    user?: any;
}

export const authenticateJWT = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(403).json({ message: "Access denied. No token provided." });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;  // Attach decoded user data to request
        next(); // Allow access to the next middleware or route
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
   
};
export const authorizeAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (req.user?.role !== "admin") {
        res.status(403).json({ message: "Access denied: Admins only." });
        return;
    }
    next();
};



