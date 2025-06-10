
import Product from '../models/product.js';

export async function getMenu() {
    try {
        const menu = await Product.find();
        return menu;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}

export async function getProduct(prodId) {
    try {
        const product = await Product.findOne({ prodId : prodId });
        return product;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}

export async function addProduct(product) {
    try {
        const result = await Product.create(product)
        return result;
    } catch (error) {
        console.log(error.message)
    }
}

export async function updateProduct( prodId, title, desc, price ){
    try{    
        return await Product.findOneAndUpdate(
            { prodId },
            {$set: {title, desc, price}},
            { new: true, runValidators: true }

        );
        


        } catch(error){
        console.log(error)
    }
}

export async function deleteProduct(prodId) {
    try {
        
        const deletedProduct = await Product.findOneAndDelete({prodId});
        if(!deletedProduct) {
            throw new Error("product do not exists")
        }
        return deletedProduct
        
        
    } catch (error) {
        console.log(error)
    }
}