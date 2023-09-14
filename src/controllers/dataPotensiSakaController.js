import response from "../response.js";
import * as dataPotensiSakaModel from "../models/dataPotensiSakaModel.js"

export async function getAll(req, res) {
    try {
        const DataPotensiSakas = await dataPotensiSakaModel.getAll();
        return response(res, 200, true, "Data potensi saka succesfully reterived!", DataPotensiSakas)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function store(req, res) {
    try {
        const { saka_id, data } = req.body

        await dataPotensiSakaModel.destroy(saka_id);
        for (const element of data) {
            await dataPotensiSakaModel.store(saka_id, element.dkr_id, element.total_mens_member, element.total_womens_member, new Date().getFullYear());
        }

        return response(res, 200, true, "Success", {})
    }catch(e) {
        return response(res, 500, false, e.message, {})
    }
}