import { verifyToken } from "../util/token.js";
import type { Request, Response, NextFunction } from "express";

interface JwtPayload {
    userId: string;
    email: string;
    verified: boolean;
}

declare global {
    namespace Express {
        interface Request {
            user: JwtPayload
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "authorized",
            success: false
        })
    }


    const decode = await verifyToken(token);

    req.user = decode as JwtPayload;

    next();
}