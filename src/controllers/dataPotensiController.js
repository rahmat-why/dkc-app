import response from '../response.js'
import * as dataPotensiModel from "../models/dataPotensiModel.js"

export async function getAll(req, res) {
    try {
        const { school_id, dkr_id } = req.params
        
        const data_potensi = await dataPotensiModel.getAll(dkr_id, school_id);
        return response(res, 200, true, "Success", data_potensi)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}