import response from "../response.js";
import * as sakaModel from "../models/sakaModel.js";
import * as logDocumentSaka from "../models/logDocumentSKSaka.js"
import { callSlackApi } from "../services/slackService.js";

export async function getAll(req, res) {
    try {
        const sakas = await sakaModel.getAll();
        return response(res, 200, true, "Success data berhasil ditampilkan!", sakas)
    }catch(e) {
        callSlackApi(e.message + "| in sakaController@getAll");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function store(req, res) {
    try {
        const { name } = req.body

        await sakaModel.store(name, '', '');
        return response(res, 200, true, "Success data berhasil ditambah!", {})
    }catch(e) {
        callSlackApi(e.message + "| in sakaController@store");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function uploadDocumentSkSaka(req, res) {
    try {
        const { saka_id } = req.params;
        const { filename } = req.file;
        const year = new Date().getFullYear().toString();

        console.log(year);

        // Buat URL untuk file yang diunggah
        const document_sk_saka_url = "/sk_saka/" + filename;

        // Panggil model untuk memperbarui kolom `document_sk_saka` pada Saka yang sesuai
        const update = await sakaModel.updateDocumentSkSaka(saka_id, document_sk_saka_url);
        await logDocumentSaka.storeSKSaka(saka_id, document_sk_saka_url, year, 'SK SAKA' );

        return response(res, 200, true, "Document SK Saka berhasil diunggah!", update);
    } catch (e) {
        callSlackApi(e.message + "| in sakaController@uploadDocumentSkSaka");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {});
    }
}

export async function uploadDocumentSkPinsaka(req, res) {
    try {
        const { saka_id } = req.params;
        const { filename } = req.file;
        const year = new Date().getFullYear().toString();
        
        // Buat URL untuk file yang diunggah
        const document_sk_pinsaka_url = "/sk_pinsaka/" + filename;

        // Panggil model untuk memperbarui kolom `document_sk_saka` pada Saka yang sesuai
        const update = await sakaModel.updateDocumentSkPinsaka(saka_id, document_sk_pinsaka_url);
        await logDocumentSaka.storeSKPinSaka(saka_id, document_sk_pinsaka_url, year, 'SK PINSAKA' )

        return response(res, 200, true, "Document SK Pin Saka berhasil diunggah!", update);
    } catch (e) {
        callSlackApi(e.message + "| in sakaController@uploadDocumentSkPinsaka");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {});
    }
}

export async function destroy(req, res) {
    try{
        const { saka_id } = req.params
        const sakas = await sakaModel.destroy(saka_id);
        return response(res, 200, true, "Success data berhasil dihapus!", sakas)
    }catch(e) {
        callSlackApi(e.message + "| in sakaController@destroy");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}