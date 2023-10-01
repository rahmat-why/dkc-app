import response from '../response.js';
import * as goalModel from '../models/goalModel.js'
import { callSlackApi } from '../services/slackService.js';

export async function getAll(req, res) {
    try {
        const goals = await goalModel.getAll();
        return response(res, 200, true, "Success data berhasil ditampilkan!", goals)
    }catch(e) {
        callSlackApi(e.message + "| in goalController@getAll");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function getAllMisi(req, res) {
    try {
        const goals = await goalModel.getAllMisi();
        return response(res, 200, true, "Success data berhasil ditampilkan!", goals)
    }catch(e) {
        callSlackApi(e.message + "| in goalController@getAllMisi");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function getAllVisi(req, res) {
    try {
        const goals = await goalModel.getAllVisi();
        return response(res, 200, true, "Success data berhasil ditampilkan!", goals)
    }catch(e) {
        callSlackApi(e.message + "| in goalController@getAllVisi");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function update(req, res) {
    try{
        const { goal_id } = req.params
        const update = {
            type : req.body.type,
            description : req.body.description
        }
        const goals = await goalModel.update(goal_id, update);
        return response(res, 200, true, "Success data berhasil diperbarui!", goals)
    }catch(e) {
        callSlackApi(e.message + "| in goalController@update");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function store(req, res) {
    try { 
        const { type, description } = req.body

        const goal = await goalModel.store(type, description);
        return response(res, 200, true, "Success data berhasil ditambah!", goal)
    }catch(e) {
        callSlackApi(e.message + "| in goalController@store");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function destroy(req, res) {
    try{
        const { goal_id } = req.params
        const goal = await goalModel.destroy(goal_id);
        return response(res, 200, true, "Success data berhasil dihapus!", goal)
    }catch(e) {
        callSlackApi(e.message + "| in goalController@destroy");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}