import response from "../response.js";
import * as reportSakaModel from "../models/reportSakaModel.js"
import { callSlackApi } from "../services/slackService.js";

export async function getAll(req, res) {
    try {
        const Reportsakas = await reportSakaModel.getAll();
        return response(res, 200, true, "Success data berhasil ditampilkan!", Reportsakas)
    }catch(e) {
        callSlackApi(e.message + "| in reportSakaController@getAll");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function store(req, res) {
    try {
        const { saka_id, name, report_date } = req.body
        const { filename } = req.file;
        
        // Buat URL untuk file yang diunggah
        const document = "/report-saka/" + filename;

        // Panggil model untuk memperbarui kolom `document_sk_saka` pada Saka yang sesuai
        const newreportSaka = await reportSakaModel.store(saka_id, name, report_date, document);

        return response(res, 200, true, "Success data berhasil ditambah!", newreportSaka)
    }catch(e) {
        callSlackApi(e.message + "| in reportSakaController@store");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function destroy(req, res) {
    try{
        const { report_id } = req.params
        const reportSaka = await reportSakaModel.destroy(report_id);
        return response(res, 200, true, "Success data berhasil dihapus!", reportSaka)
    }catch(e) {
        callSlackApi(e.message + "| in reportSakaController@destroy");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}