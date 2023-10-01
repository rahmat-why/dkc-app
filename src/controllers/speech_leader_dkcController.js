import response from '../response.js';
import * as speech_leader_dkcModel from "../models/speech_leader_dkcModel.js"
import { callSlackApi } from '../services/slackService.js';

export async function getAll(req, res) {
    try {
        const speech_leader_dkc = await speech_leader_dkcModel.getAll();
        return response(res, 200, true, "Success data berhasil ditampilkan!", speech_leader_dkc)
    }catch(e) {
        callSlackApi(e.message + "| in speech_leader_dkcController@getAll");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function store(req, res) {
    try {
        const { description, name, nta } = req.body
        const { filename } = req.file

        const image_url = '/spech_leader_dkc/' + filename;

        const speech_leader_dkc = await speech_leader_dkcModel.store( description, image_url, name, nta);
        return response(res, 200, true, "Success data berhasil ditambah!", speech_leader_dkc)
    }catch(e) {
        callSlackApi(e.message + "| in speech_leader_dkcController@store");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function destroy(req, res) {
    try{
        const { speech_id } = req.params
        const speech_leader_dkcs = await speech_leader_dkcModel.destroy(speech_id);
        return response(res, 500, false, "Success data berhasil dihapus!", speech_leader_dkcs)
    }catch(e) {
        callSlackApi(e.message + "| in speech_leader_dkcController@destroy");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}