import response from '../response.js'
import * as dataPotensiModel from "../models/dataPotensiModel.js"
import { callSlackApi } from '../services/slackService.js';

export async function getAll(req, res) {
    try {
        const { school_id, dkr_id } = req.params
        
        const data_potensi = await dataPotensiModel.getAll(dkr_id, school_id);
        return response(res, 200, true, "Success data berhasil ditampilkan!", data_potensi)
    }catch(e) {
        callSlackApi(e.message + "| in dataPotensiController@getAll");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function store(req, res) {
    try {
        const { dkr_id } = req.params
        const { school_id, data } = req.body

        await dataPotensiModel.destroy(dkr_id, school_id);
        for (const element of data) {
            await dataPotensiModel.store(dkr_id, school_id, element.stage_id, element.mens_member, element.womens_member, new Date().getFullYear());
        }

        return response(res, 200, true, "Success data berhasil ditambah!", [dkr_id, school_id, data])
    }catch(e) {
        callSlackApi(e.message + "| in dataPotensiController@store");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}