import { verifyToken } from "../utils/index.js";

export function authUser(req,res,next) {
    if(req.headers.authorization) {
        const token = req.headers.authorization.replace("Bearer ","");
        const payload = verifyToken(token)
        req.user = payload
        if(payload){
            next()
        }else {
            res.status(400).json({
            success: false,
            message: "invalid token provided"
        })

        }
    }else {
        res.status(400).json({
            success: false,
            message: "no token provided"
        })
    }
}