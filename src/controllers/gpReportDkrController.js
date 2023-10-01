import response from '../response.js'
import * as gpReportDkrModel from "../models/gpReportDkrModel.js"
import { callSlackApi } from '../services/slackService.js';

export async function getAll(req, res) {
    try {
        const { type, dkr_id } = req.params
        const gp_report = await gpReportDkrModel.getAll(dkr_id, type);
        return response(res, 200, true, "Success data berhasil ditampilkan!", gp_report)
    }catch(e) {
        callSlackApi(e.message + "| in gpReportDkrController@getAll");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function store(req, res) {
    try {
        const { dkr_id } = req.params
        const { name, type, year } = req.body
        const { filename } = req.file
        
        const document_url = "/gp-report/"+filename;

        const gp_report = await gpReportDkrModel.store(dkr_id, document_url, name, type, year);
        return response(res, 200, false, "Success data berhasil ditambah!", gp_report)
    }catch(e) {
        callSlackApi(e.message + "| in gpReportDkrController@store");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function update(req, res) {
    try {
        const { report_id } = req.params;
        const update = {
            dkr_id : req.body.dkr_id,
            name : req.body.name,
            type : req.body.type,
            year : req.body.year
        }

        const gp_reports = await gpReportDkrModel.update(report_id, update);
        return response(res, 200, false, "Success data berhasil diperbarui!", gp_reports)
    }catch(e) {
        callSlackApi(e.message + "| in gpReportDkrController@update");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function destroy(req, res) {
    try{
        const { report_id } = req.params
        const gp_report = await gpReportDkrModel.destroy(report_id);
        return response(res, 200, false, "Success data berhasil dihapus!", gp_report)
    }catch(e) {
        callSlackApi(e.message + "| in gpReportDkrController@destroy");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}