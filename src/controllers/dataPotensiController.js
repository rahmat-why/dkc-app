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

export async function store(req, res) {
    try {
        const { dkr_id } = req.params
        const { school_id, data } = req.body

        console.log(JSON.stringify(dkr_id, school_id, data))

        await dataPotensiModel.destroy(dkr_id);
        for (const element of data) {
            await dataPotensiModel.store(dkr_id, school_id, element.stage_id, element.total_member, new Date().getFullYear());
        }

        return response(res, 200, true, "Success", [dkr_id, school_id, data])
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}