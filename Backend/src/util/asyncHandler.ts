import type { Request, Response, NextFunction } from "express";

export const asyncHandler = (fn: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await fn(req, res, next);
            return result;
        } catch (error) {
            console.log("Server error " + error);
            return res.status(500).json({ error: "Server error " + error, success: false });
        }
    }
}