import response from '../response.js';
import * as scout_documentModel from "../models/scout-documentModel.js"

export async function getAll(req, res) {
    try {
        const scout_documents = await scout_documentModel.getAll();
        return response(res, 200, true, "Success data berhasil ditampilkan!", scout_documents)
    }catch(e) {
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function store(req, res) {
    try {
        const { name } = req.body
        const { filename } = req.file

        const document_url = '/scout-document/' + filename;

        const scout_document = await scout_documentModel.store( document_url, name);
        return response(res, 200, true, "Success data berhasil ditambah!", scout_document)
    }catch(e) {
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function update(req, res){
    try{
        const { document_id } = req.params;
        const update = {
            name: req.body.name
        }

        const scout_documents = await scout_documentModel.update(document_id, update);
        return response(res, 200, true, "Success data berhasil diperbarui!", scout_documents);
    }catch(e) {
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function destroy(req, res) {
    try{
        const { document_id } = req.params
        const scout_document = await scout_documentModel.destroy(document_id);
        return response(res, 200, true, "Success data berhasil dihapus!", scout_document)
    }catch(e) {
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}