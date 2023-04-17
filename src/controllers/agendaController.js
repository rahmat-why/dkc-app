import response from '../response.js';
import * as agendaModel from '../models/agendaModel.js'

export async function getAll(req, res) {
    try {
        const agendas = await agendaModel.getAll();
        return response(res, 200, true, "Success", agendas)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function update(req, res) {
    try{
        const { agenda_id } = req.params
        const agendas = await agendaModel.update(agenda_id, req.body);
        return response(res, 200, true, "Success", agendas)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function store(req, res) {
    try {
        const { title, scheduleAt } = req.body

        const agenda = await agendaModel.store( title, scheduleAt);
        return response(res, 200, true, "Success", agenda)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function destroy(req, res) {
    try{
        const { agenda_id } = req.params
        const agenda = await agendaModel.destroy(agenda_id);
        return response(res, 200, true, "Success", agenda)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}