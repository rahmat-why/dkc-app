import response from '../response.js'
import * as structureDkrModel from "../models/structureDkrModel.js"

export async function getAll(req, res) {
    try {
        const { dkr_id } = req.params
        const structures_dkr = await structureDkrModel.getAll(dkr_id);
        return response(res, 200, true, "Success", structures_dkr)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function store(req, res) {
    try {
        const { dkr_id, year } = req.body
        const { filename } = req.file
        
        const image_url = "/structure-dkr/"+filename;

        const structures_dkr = await structureDkrModel.store(dkr_id, image_url, year);
        return response(res, 200, false, "Success", structures_dkr)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function destroy(req, res) {
    try{
        const { structure_id } = req.params
        const structures_dkr = await structureDkrModel.destroy(structure_id);
        return response(res, 200, false, "Success", structures_dkr)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}