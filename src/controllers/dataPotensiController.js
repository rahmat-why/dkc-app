import response from '../response.js'
import * as dataPotensiModel from "../models/dataPotensiModel.js"

export async function getAll(req, res) {
    try {
        const area_coordinator = await dataPotensiModel.getAll();
        return response(res, 200, true, "Success", area_coordinator)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}