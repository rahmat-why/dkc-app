import response from '../response.js';
import * as achievementModel from '../models/achievementModel.js'

export async function getAll(req, res) {
    try {
        const achievements = await achievementModel.getAll();
        return response(res, 200, true, "Success", achievements)
    }catch(e) {
        return response(res, 500, false, e, {})
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
        return response(res, 200, true, "Success", achievements)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function store(req, res) {
    try {
        const { title, description } = req.body

        const achievement = await achievementModel.store( title, description);
        return response(res, 200, true, "Success", achievement)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function destroy(req, res) {
    try{
        const { achievement_id } = req.params
        const achievement = await achievementModel.destroy(achievement_id);
        return response(res, 200, true, "Success", achievement)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}