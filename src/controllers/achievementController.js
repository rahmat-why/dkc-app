import response from '../response.js';
import * as achievementModel from '../models/achievementModel.js'
import { callSlackApi } from '../services/slackService.js';

export async function getAll(req, res) {
    try {
        const achievements = await achievementModel.getAll();
        return response(res, 200, true, "Success data berhasil ditampilkan!", achievements)
    }catch(e) {
        callSlackApi(e.message + "| in achievementController@getAll");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function update(req, res) {
    try{
        const { achievement_id } = req.params
        const update = {
            title : req.body.title,
            description : req.body.description
        }
        const achievements = await achievementModel.update(achievement_id, update);
        return response(res, 200, true, "Success data berhasil diperbarui!", achievements)
    }catch(e) {
        callSlackApi(e.message + "| in achievementController@update");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function store(req, res) {
    try {
        const { title, description } = req.body

        const achievement = await achievementModel.store( title, description);
        return response(res, 200, true, "Success data berhasil ditambah!", achievement)
    }catch(e) {
        callSlackApi(e.message + "| in achievementController@store");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function destroy(req, res) {
    try{
        const { achievement_id } = req.params
        const achievement = await achievementModel.destroy(achievement_id);
        return response(res, 200, true, "Success data berhasil dihapus!", achievement)
    }catch(e) {
        callSlackApi(e.message + "| in achievementController@destroy");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}