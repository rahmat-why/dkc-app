import response from "../response.js";
import * as DataPotensiSakaModel from "../models/dataPotensiSakaModel.js"

export async function getAll(req, res) {
    try {
        const DataPotensiSakas = await DataPotensiSakaModel.getAll();
        return response(res, 200, true, "Data potensi saka succesfully reterived!", DataPotensiSakas)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function store(req, res) {
    try {
        const { saka_id, dkr_id, total_member, mens_member, womens_member, year  } = req.body

        const DataPotensiSaka = await DataPotensiSakaModel.store( saka_id, dkr_id, total_member, mens_member, womens_member, year );
        return response(res, 200, true, "Data potensi succesfully added!", DataPotensiSaka)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}