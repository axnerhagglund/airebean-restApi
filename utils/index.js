import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export async function hashPassword(password){
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

export async function comparePasswords( password, hashedPassword){
    const isSame = await bcrypt.compare(password, hashedPassword);
    return isSame;
}

export function getToken(payload) {
    const token = jwt.sign(
        payload,
        process.env.SECRETSTRING,
        {expiresIn : 59 * 59 }
    );
    return token;
}

export function verifyToken(token){
    try {
        const decoded = jwt.verify(token,process.env.SECRETSTRING)
        return decoded
    } catch (error) {
        console.log(error.message)
        return null;
    }
}