import response from "../response.js";
import * as dataPotensiSakaModel from "../models/dataPotensiSakaModel.js"
import { callSlackApi } from "../services/slackService.js";

export async function getAll(req, res) {
    try {
        const DataPotensiSakas = await dataPotensiSakaModel.getAll();
        return response(res, 200, true, "Success data berhasil ditampilkan!", DataPotensiSakas)
    }catch(e) {
        callSlackApi(e.message + "| in dataPotensiSakaController@getAll");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function store(req, res) {
    try {
        const { saka_id, data } = req.body

        await dataPotensiSakaModel.destroy(saka_id);
        for (const element of data) {
            await dataPotensiSakaModel.store(saka_id, element.dkr_id, element.total_mens_member, element.total_womens_member, new Date().getFullYear());
        }

        return response(res, 200, true, "Success data berhasil ditambah!", {})
    }catch(e) {
        callSlackApi(e.message + "| in dataPotensiSakaController@store");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}