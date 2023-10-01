import response from '../response.js'
import * as schoolModel from "../models/schoolModel.js"
import {callSlackApi} from '../services/slackService.js';

export async function getAll(req, res) {
    try {
        const { dkr_id } = req.params
        const schools = await schoolModel.getAll(dkr_id);
        return response(res, 200, true, "Success data berhasil ditampilkan!", schools)
    }catch(e) {
        callSlackApi(e.message + "| in schoolController@getAll");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function store(req, res) {
    try {
        const { dkr_id } = req.params
        const { gudep_number, school_name } = req.body
        const schools = await schoolModel.store(dkr_id, gudep_number, school_name);
        return response(res, 200, true, "Success data berhasil ditambah!", schools)
    }catch(e) {
        callSlackApi(e.message + "| in schoolController@store");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function update(req, res) {
    try{
        const { school_id } = req.params
        const schools = await schoolModel.update(school_id, req.body);
        return response(res, 200, true, "Success data berhasil diperbarui!", schools)
    }catch(e) {
        callSlackApi(e.message + "| in schoolController@update");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function destroy(req, res) {
    try{
        const { school_id } = req.params
        const schools = await schoolModel.destroy(school_id);
        return response(res, 200, true, "Success data berhasil dihapus!", schools)
    }catch(e) {
        callSlackApi(e.message + "| in schoolController@delete");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}