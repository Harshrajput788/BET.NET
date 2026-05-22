import jwt from "jsonwebtoken";
import type { IUSER } from "../model/user.js";
import { config } from "dotenv";

config();

export const createToken = async (user:IUSER):Promise<string> =>{
    const payload = {
        userId:user._id,
        email:user.email,
        verified:user.verified,
    }

    const token =  jwt.sign(payload,process.env.JWTSECRET as string,{expiresIn:"7d"});

    return token;
}

export const verifyToken = async (token:string) =>{

    const payload = jwt.verify(token,process.env.JWTSECRET as string);

    return payload;
}