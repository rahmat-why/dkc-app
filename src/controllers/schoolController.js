import response from '../response.js'
import * as schoolModel from "../models/schoolModel.js"

export async function getAll(req, res) {
    try {
        const schools = await schoolModel.getAll();
        return response(res, 200, true, "Success", schools)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function store(req, res) {
    try {
        const { dkr_id, gudep_number, school_name } = req.body
        const schools = await schoolModel.store(dkr_id, gudep_number, school_name);
        return response(res, 200, true, "Success", schools)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function update(req, res) {
    try{
        const { school_id } = req.params
        const schools = await schoolModel.update(school_id, req.body);
        return response(res, 200, true, "Success", schools)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function destroy(req, res) {
    try{
        const { school_id } = req.params
        const schools = await schoolModel.destroy(school_id);
        return response(res, 200, true, "Success", schools)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}