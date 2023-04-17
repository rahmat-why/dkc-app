import response from '../response.js';
import * as bannerModel from "../models/bannerModel.js"

export async function getAll(req, res) {
    try {
        const banners = await bannerModel.getAll();
        return response(res, 200, true, "Success", banners)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function store(req, res) {
    try {
        const { type } = req.body
        const { filename } = req.file

        const image_url = '/banner/' + filename;

        const banner = await bannerModel.store( image_url, type);
        return response(res, 200, true, "Success", banner)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function destroy(req, res) {
    try{
        const { banner_id } = req.params
        const banners = await bannerModel.destroy(banner_id);
        return response(res, 500, false, "Success", banners)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}