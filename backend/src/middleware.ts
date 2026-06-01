import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
        //@ts-ignore
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}