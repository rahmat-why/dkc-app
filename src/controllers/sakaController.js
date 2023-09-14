import response from "../response.js";
import * as sakaModel from "../models/sakaModel.js";

export async function getAll(req, res) {
    try {
        const sakas = await sakaModel.getAll();
        return response(res, 200, true, "Saka succesfully reterived!", sakas)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function store(req, res) {
    try {
        const { name } = req.body

        await sakaModel.store(name, '', '');
        return response(res, 200, true, "Saka succesfully added!", {})
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function uploadDocumentSkSaka(req, res) {
    try {
        const { saka_id } = req.params;
        const { filename } = req.file;
        
        // Buat URL untuk file yang diunggah
        const document_sk_saka_url = "/sk_saka/" + filename;

        // Panggil model untuk memperbarui kolom `document_sk_saka` pada Saka yang sesuai
        const update = await sakaModel.updateDocumentSkSaka(saka_id, document_sk_saka_url);

        return response(res, 200, true, "Document SK Saka successfully uploaded!", update);
    } catch (e) {
        return response(res, 500, false, e.message || "An error occurred", {});
    }
}

export async function uploadDocumentSkPinsaka(req, res) {
    try {
        const { saka_id } = req.params;
        const { filename } = req.file;
        
        // Buat URL untuk file yang diunggah
        const document_sk_pinsaka_url = "/sk_pinsaka/" + filename;

        // Panggil model untuk memperbarui kolom `document_sk_saka` pada Saka yang sesuai
        const update = await sakaModel.updateDocumentSkPinsaka(saka_id, document_sk_pinsaka_url);

        return response(res, 200, true, "Document SK Pin Saka successfully uploaded!", update);
    } catch (e) {
        return response(res, 500, false, e.message || "An error occurred", {});
    }
}

export async function destroy(req, res) {
    try{
        const { saka_id } = req.params
        const sakas = await sakaModel.destroy(saka_id);
        return response(res, 200, true, "saka successfully deleted!", sakas)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}