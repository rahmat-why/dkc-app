import response from '../response.js';
import * as bannerModel from "../models/bannerModel.js"
import { callSlackApi } from '../services/slackService.js';

export async function getAll(req, res) {
    try {
        const banners = await bannerModel.getAll();
        return response(res, 200, true, "Success data berhasil ditampilkan!", banners)
    }catch(e) {
        callSlackApi(e.message + "| in bannerController@getAll");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function store(req, res) {
    try {
        const { type } = req.body
        const { filename } = req.file

        const image_url = '/banner/' + filename;

        const banner = await bannerModel.store( image_url, type);
        return response(res, 200, true, "Success data berhasil ditambah!", banner)
    }catch(e) {
        callSlackApi(e.message + "| in bannerController@store");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function destroy(req, res) {
    try{
        const { banner_id } = req.params
        const banners = await bannerModel.destroy(banner_id);
        return response(res, 200, true, "Success data berhasil dihapus!", banners)
    }catch(e) {
        callSlackApi(e.message + "| in bannerController@destroy");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}