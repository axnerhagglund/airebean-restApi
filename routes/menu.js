import { Router } from 'express';
import { addProduct, getMenu } from '../services/menu.js';
import { validateMenuBody } from '../middlewares/validators.js';

import { v4 as uuid } from 'uuid';

const router = Router();

router.get('/', async (req, res, next) => {
    const menu = await getMenu();
    if(menu) {
        res.json({
            success : true,
            menu : menu
        });
    } else {
        next({
            status : 404,
            message : 'Menu not found'
        });
    }
})

router.post("/", validateMenuBody, async (req,res,next) => {
    const {title, price , desc} = req.body
    const prodId = `prod-${uuid().substring(0, 5)}`
    const result = await addProduct({
        prodId: prodId,
        title: title,
        desc: desc,
        price: price,
        createdAt: new Date().toISOString()
    })

    if(result) {
        res.status(201).json({
            success : true,
            message : "product added to menu"
        })

    } else {
        res.status(400).json({
            success: false,
            message: "operation failed, product not added"
        })
    }
})

export default router;