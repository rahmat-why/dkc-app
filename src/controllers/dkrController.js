import response from '../response.js'
import * as dkrModel from "../models/dkrModel.js"

export async function getAll(req, res) {
    try {
        const dkrs = await dkrModel.getAll();
        return response(res, 200, true, "Success", dkrs)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function store(req, res) {
    try {
        const { name, area_id, username, password } = req.body
        const dkrs = await dkrModel.store(name, area_id, username, password);
        return response(res, 200, true, "Success", dkrs)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function update(req, res) {
    try{
        const { dkr_id } = req.params
        const dkrs = await dkrModel.update(dkr_id, req.body);
        return response(res, 200, true, "Success", dkrs)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function destroy(req, res) {
    try{
        const { dkr_id } = req.params
        const dkrs = await dkrModel.destroy(dkr_id);
        return response(res, 200, true, "Success", dkrs)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}