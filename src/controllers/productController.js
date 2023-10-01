import response from '../response.js';
import * as productModel from "../models/productModel.js"
import { callSlackApi } from '../services/slackService.js';

export async function getAll(req, res) {
    try {
        const products = await productModel.getAll();
        return response(res, 200, true, "Success data berhasil ditampilkan!", products)
    }catch(e) {
        callSlackApi(e.message + "| in productController@getAll");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function store(req, res) {
    try {
        const { link, name } = req.body
        const { filename } = req.file

        const image_url = '/product/' + filename;

        const product = await productModel.store( image_url, link, name);
        return response(res, 200, true, "Success data berhasil ditambah!", product)
    }catch(e) {
        callSlackApi(e.message + "| in productController@store");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function update(req, res) {
    try{
        const { product_id } = req.params
        
        const update = {
            link : req.body.link,
            name : req.body.name
        }

        const products = await productModel.update(product_id, update);
        return response(res, 200, true, "Success data berhasil diperbarui!", products)
    }catch(e) {
        callSlackApi(e.message + "| in productController@update");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function destroy(req, res) {
    try{
        const { product_id } = req.params
        const product = await productModel.destroy(product_id);
        return response(res, 200, true, "Success data berhasil dihapus!", product)
    }catch(e) {
        callSlackApi(e.message + "| in productController@destroy");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}