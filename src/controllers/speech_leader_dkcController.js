import response from '../response.js';
import * as speech_leader_dkcModel from "../models/speech_leader_dkcModel.js"

export async function getAll(req, res) {
    try {
        const speech_leader_dkc = await speech_leader_dkcModel.getAll();
        return response(res, 200, true, "Success", speech_leader_dkc)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function store(req, res) {
    try {
        const { description, name, nta } = req.body
        const { filename } = req.file

        const image_url = '/spech_leader_dkc/' + filename;

        const speech_leader_dkc = await speech_leader_dkcModel.store( description, image_url, name, nta);
        return response(res, 200, true, "Success", speech_leader_dkc)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function destroy(req, res) {
    try{
        const { speech_id } = req.params
        const speech_leader_dkcs = await speech_leader_dkcModel.destroy(speech_id);
        return response(res, 500, false, "Success", speech_leader_dkcs)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}