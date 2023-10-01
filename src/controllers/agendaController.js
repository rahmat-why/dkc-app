import response from '../response.js';
import * as agendaModel from '../models/agendaModel.js'
import { callSlackApi } from '../services/slackService.js';

export async function getAll(req, res) {
    try {
        const agendas = await agendaModel.getAll();
        return response(res, 200, true, "Success data berhasil ditampilkan!", agendas)
    }catch(e) {
        callSlackApi(e.message + "| in agendaController@getAll");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function update(req, res) {
    try{
        const { agenda_id } = req.params
        const update = {
            title : req.body.title,
            scheduleAt : req.body.scheduleAt,
        }
        const agendas = await agendaModel.update(agenda_id, update);
        return response(res, 200, true, "Success data berhasil diperbarui!", agendas)
    }catch(e) {
        callSlackApi(e.message + "| in agendaController@update");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function store(req, res) {
    try {
        const { title, scheduleAt } = req.body

        const agenda = await agendaModel.store( title, scheduleAt);
        return response(res, 200, true, "Success data berhasil ditambah!", agenda)
    }catch(e) {
        callSlackApi(e.message + "| in agendaController@store");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function destroy(req, res) {
    try{
        const { agenda_id } = req.params
        const agenda = await agendaModel.destroy(agenda_id);
        return response(res, 200, true, "Success data berhasil dihapus!", agenda)
    }catch(e) {
        callSlackApi(e.message + "| in agendaController@destroy");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}