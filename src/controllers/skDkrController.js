import response from '../response.js'
import * as skDkrModel from "../models/skDkrModel.js"

export async function getAll(req, res) {
    try {
        const { dkr_id } = req.params
        const sk_dkr = await skDkrModel.getAll(dkr_id);
        return response(res, 200, true, "Success", sk_dkr)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function store(req, res) {
    try {
        const { dkr_id } = req.params
        const { year } = req.body
        const { filename } = req.file
        
        const document_url = "/sk-dkr/"+filename;

        const sk_dkr = await skDkrModel.store(dkr_id, document_url, year);
        return response(res, 200, true, "Success", sk_dkr)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function destroy(req, res) {
    try{
        const { sk_id } = req.params
        const sk_dkr = await skDkrModel.destroy(sk_id);
        return response(res, 200, true, "Success", sk_dkr)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}