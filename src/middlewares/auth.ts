import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload{
    id: string,
    name: string,
    iat: number,
    exp: number
}
export default function authMiddleware(request:Request, response:Response, next: NextFunction){

    const authHeader = request.headers.authorization;

    if(!authHeader){
        return response.status(401).json({error: "No token provided"});
    }
    
    const [bearer, token] = authHeader.split(" ");
    try {
        const decoded = jwt.verify(token, "secret") as TokenPayload;
        const user_id = decoded.id;
        request.user_id = user_id;
        return next();
    } catch (error) {
        return response.status(401).json({error: "Invalid token"});        
    }
}