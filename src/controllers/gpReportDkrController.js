import response from '../response.js'
import * as gpReportModel from "../models/gpReportDkrModel.js"

export async function getAll(req, res) {
    try {
        const schools = await gpReportModel.getAll();
        return response(res, 200, true, "Success", schools)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function store(req, res) {
    try {
        const { dkr_id, gudep_number, school_name } = req.body
        const schools = await gpReportModel.store(dkr_id, gudep_number, school_name);
        return response(res, 500, false, "Success", schools)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function destroy(req, res) {
    try{
        const { school_id } = req.params
        const schools = await gpReportModel.destroy(school_id);
        return response(res, 500, false, "Success", schools)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}