import { Router } from 'express';
import { hashPassword } from "../utils/index.js"
import { validateAuthBody } from '../middlewares/validators.js';
import { getUser, registerUser } from '../services/users.js';
import { v4 as uuid } from 'uuid';
import { comparePasswords } from '../utils/index.js';
import { getToken } from '../utils/index.js';



const router = Router();

router.get('/logout', (req, res, next) => {
   res.status(201).json({
    success: true,
    message: "User logged out successfully. Discard the token on the client side."
   })
});

router.post('/register', validateAuthBody, async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await hashPassword(password);
    const result = await registerUser({
        username: username,
        password : hashedPassword,
        role : role,
        userId : `${role}-${uuid().substring(0, 5)}`
    });
    if(result) {
        res.status(201).json({
            success : true,
            message : 'New user registered successfully'
        });
    } else {
        res.status(400).json({
            success: false,
            message : 'Registration unsuccessful'
        });
    }
});

router.post('/login', validateAuthBody, async (req, res) => {
    const { username, password } = req.body;
    const user = await getUser(username);
    if(user) {
        const correctPass = await comparePasswords(password, user.password)
        if(correctPass) {
            const token = getToken({ userId : user.userId, role: user.role, username: user.username })
            res.status(201).json({
                success : true,
                message : 'User logged in successfully',
                token : `Bearer ${token}`
            });
        } else {
            res.status(400).json({
                success : false,
                message : 'Incorrect username and/or password'
            });
        }
    } else {
        res.status(400).json({
            success : false,
            message : 'No user found'
        });
    }
});

export default router;