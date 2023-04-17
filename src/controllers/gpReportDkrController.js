import response from '../response.js'
import * as gpReportDkrModel from "../models/gpReportDkrModel.js"

export async function getAll(req, res) {
    try {
        const { dkr_id } = req.params
        const gp_report = await gpReportDkrModel.getAll(dkr_id);
        return response(res, 200, true, "Success", gp_report)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function store(req, res) {
    try {
        const { dkr_id, name, type } = req.body
        const { filename } = req.file
        
        const document_url = "/gp-report-dkr/"+filename;

        const gp_report = await gpReportDkrModel.store(dkr_id, document_url, name, type);
        return response(res, 200, false, "Success", gp_report)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function destroy(req, res) {
    try{
        const { report_id } = req.params
        const gp_report = await gpReportDkrModel.destroy(report_id);
        return response(res, 200, false, "Success", gp_report)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}