import { Router } from 'express';
import { addProduct, getMenu, getProduct, updateProduct } from '../services/menu.js';
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

//put product in menu

router.put("/:prodId", validateMenuBody, async (req,res,next) => {
    const {title, desc, price} = req.body;
    const { prodId } = req.params;
    console.log(prodId)
    const updated = await updateProduct(prodId, title, desc, price);
    if(updated){
        res.status(200).json({
            success : true,
            message : "Product updated",
            data: updated
        })
    } else {
        res.status(400).json({
            success : false,
            message : "Product not found"
        })
    }
})

export default router;