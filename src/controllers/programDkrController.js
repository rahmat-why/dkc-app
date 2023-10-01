import response from '../response.js'
import * as programDkrModel from "../models/programDkrModel.js"
import { callSlackApi } from '../services/slackService.js';

export async function getAll(req, res) {
    try {
        const { dkr_id } = req.params
        const program_dkrs = await programDkrModel.getAll(dkr_id);
        return response(res, 200, true, "Success data berhasil ditampilkan!", program_dkrs)
    }catch(e) {
        callSlackApi(e.message + "| in programDkrController@getAll");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function store(req, res) {
    try {
        const { dkr_id } = req.params
        const { month, year, program_name } = req.body
        const program_dkrs = await programDkrModel.store(dkr_id, month, year, program_name);
        return response(res, 200, false, "Success data berhasil ditambah!", program_dkrs)
    }catch(e) {
        callSlackApi(e.message + "| in programDkrController@store");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function update(req, res) {
    try{
        const { program_id } = req.params
        const update = {
            dkr_id : req.body.dkr_id,
            month : req.body.month,
            program_name : req.body.program_name,
            year : req.body.year
        }
        const program_dkrs = await programDkrModel.update(program_id, update);
        return response(res, 200, true, "Success data berhasil diperbarui!", program_dkrs)
    }catch(e) {
        callSlackApi(e.message + "| in programDkrController@update");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function destroy(req, res) {
    try{
        const { program_id } = req.params
        const program_dkrs = await programDkrModel.destroy(program_id);
        return response(res, 200, true, "Success data berhasil dihapus!", program_dkrs)
    }catch(e) {
        callSlackApi(e.message + "| in programDkrController@destroy");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}