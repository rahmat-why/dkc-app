import response from '../response.js';
import * as productModel from "../models/productModel.js"

export async function getAll(req, res) {
    try {
        const products = await productModel.getAll();
        return response(res, 200, true, "Success", products)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function store(req, res) {
    try {
        const { link, name } = req.body
        const { filename } = req.file

        const image_url = '/product/' + filename;

        const product = await productModel.store( image_url, link, name);
        return response(res, 200, true, "Success", product)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function destroy(req, res) {
    try{
        const { product_id } = req.params
        const product = await productModel.destroy(product_id);
        return response(res, 200, true, "Success", product)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}