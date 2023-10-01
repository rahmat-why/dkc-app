import response from '../response.js'
import * as dkrModel from "../models/dkrModel.js"
import * as logDocumentDkr from "../models/logDocumentDkr.js"
import { callSlackApi } from '../services/slackService.js';

export async function getAll(req, res) {
    try {
        const dkrs = await dkrModel.getAll();
        return response(res, 200, true, "Success data berhasil ditampilkan!", dkrs)
    }catch(e) {
        callSlackApi(e.message + "| in dkrController@getAll");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function getByDkr_id(req, res) {
    try {
        const { dkr_id } = req.params
        const dkrs = await dkrModel.getByDkr_id(dkr_id);
        return response(res, 200, true, "Success data berhasil ditampilkan!", dkrs)
    }catch(e) {
        callSlackApi(e.message + "| in dkrController@getByDkr_id");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function getByArea(req, res) {
    try {
        const { area_id } = req.params
        const dkrs = await dkrModel.getByArea(area_id);
        return response(res, 200, true, "Success data berhasil ditampilkan!", dkrs)
    }catch(e) {
        callSlackApi(e.message + "| in dkrController@getByArea");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function store(req, res) {
    try {
        const { name, area_id, username, password } = req.body
        const dkrs = await dkrModel.store(name, area_id, username, password);
        return response(res, 200, true, "Success data berhasil ditambah!", dkrs)
    }catch(e) {
        callSlackApi(e.message + "| in dkrController@store");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function update(req, res) {
    try{
        const { dkr_id } = req.params
        const dkrs = await dkrModel.update(dkr_id, req.body);
        return response(res, 200, true, "Success data berhasil diperbarui!", dkrs)
    }catch(e) {
        callSlackApi(e.message + "| in dkrController@update");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function destroy(req, res) {
    try{
        const { dkr_id } = req.params
        const dkrs = await dkrModel.destroy(dkr_id);
        return response(res, 200, true, "Success data berhasil dihapus!", dkrs)
    }catch(e) {
        callSlackApi(e.message + "| in dkrController@destroy");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function getStructureDkr(req, res) {
    try {
        const { dkr_id } = req.params

        const structureDkr = await dkrModel.getStructureDkr(dkr_id);
        return response(res, 200, true, "Success data berhasil ditampilkan!", structureDkr)
    }catch(e) {
        callSlackApi(e.message + "| in dkrController@getStructureDkr");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function storeStructureDkr(req, res) {
    try {
        const { dkr_id } = req.params
        const { filename } = req.file
        const year = new Date().getFullYear().toString();
        
        const image_url = "/structure-dkr/"+filename;

        await dkrModel.update(dkr_id, {image_structure_dkr: image_url});
        await logDocumentDkr.store(dkr_id, image_url, year, "STRUCTURE DKR");

        return response(res, 200, true, "Success data berhasil ditambah!", {})
    }catch(e) {
        callSlackApi(e.message + "| in dkrController@storeStructureDkr");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function getSkDkr(req, res) {
    try {
        const { dkr_id } = req.params

        const skDkr = await dkrModel.getSkDkr(dkr_id);
        return response(res, 200, true, "Success data berhasil ditampilkan!", skDkr)
    }catch(e) {
        callSlackApi(e.message + "| in dkrController@getSkDkr");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function storeSkDkr(req, res) {
    try {
        const { dkr_id } = req.params
        const { filename } = req.file
        const year = new Date().getFullYear().toString();
        
        const document_url = "/sk-dkr/"+filename;

        await dkrModel.update(dkr_id, {document_sk_dkr: document_url});
        await logDocumentDkr.store(dkr_id, document_url, year, "SK DKR");

        return response(res, 200, true, "Success data berhasil ditambah!", {})
    }catch(e) {
        callSlackApi(e.message + "| in dkrController@storeSkDkr");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}