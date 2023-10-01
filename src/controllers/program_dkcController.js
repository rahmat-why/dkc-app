import response from '../response.js';
import * as program_dkcModel from '../models/program_dkcModel.js'
import { callSlackApi } from '../services/slackService.js';

export async function getAll(req, res) {
    try {
        const program_dkcs = await program_dkcModel.getAll();
        return response(res, 200, true, "Success data berhasil ditampilkan!", program_dkcs)
    }catch(e) {
        callSlackApi(e.message + "| in program_dkcController@getAll");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function getByYear(req, res) {
    try {
        const { year } = req.params
        const program_dkcs = await program_dkcModel.getByYear(year);
        return response(res, 200, true, "Success data berhasil ditampilkan!", program_dkcs)
    }catch(e) {
        callSlackApi(e.message + "| in program_dkcController@getByYear");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function update(req, res) {
    try{
        const { program_id } = req.params
        const update = {
            program_name : req.body.program_name,
            year : req.body.year
        }
        const program_dkcs = await program_dkcModel.update(program_id, update);
        return response(res, 200, true, "Success data berhasil diperbarui!", program_dkcs)
    }catch(e) {
        callSlackApi(e.message + "| in program_dkcController@update");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function store(req, res) {
    try {
        const { program_name, year } = req.body

        const program_dkc = await program_dkcModel.store(program_name, year);
        return response(res, 200, true, "Success data berhasil ditambah!", program_dkc)
    }catch(e) {
        callSlackApi(e.message + "| in program_dkcController@store");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function destroy(req, res) {
    try{
        const { program_id } = req.params
        const program_dkc = await program_dkcModel.destroy(program_id);
        return response(res, 200, true, "Success data berhasil dihapus!", program_dkc)
    }catch(e) {
        callSlackApi(e.message + "| in program_dkcController@destroy");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}