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
        const { dkr_id, name, type } = req.body
        const { filename } = req.file
        
        const document_url = "/gp-report/"+filename;

        const gp_report = await gpReportModel.store(dkr_id, document_url, name, type);
        return response(res, 200, false, "Success", gp_report)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function destroy(req, res) {
    try{
        const { report_id } = req.params
        const gp_report = await gpReportModel.destroy(report_id);
        return response(res, 200, false, "Success", gp_report)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}