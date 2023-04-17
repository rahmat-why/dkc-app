import response from '../response.js';
import * as goalModel from '../models/goalModel.js'

export async function getAll(req, res) {
    try {
        const goals = await goalModel.getAll();
        return response(res, 200, true, "Success", goals)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function getAllMisi(req, res) {
    try {
        const goals = await goalModel.getAllMisi();
        return response(res, 200, true, "Success", goals)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function getAllVisi(req, res) {
    try {
        const goals = await goalModel.getAllVisi();
        return response(res, 200, true, "Success", goals)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function update(req, res) {
    try{
        const { goal_id } = req.params
        const goals = await goalModel.update(goal_id, req.body);
        return response(res, 200, true, "Success", goals)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function store(req, res) {
    try {
        const { type, description } = req.body

        const goal = await goalModel.store(type, description);
        return response(res, 200, true, "Success", goal)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function destroy(req, res) {
    try{
        const { goal_id } = req.params
        const goal = await goalModel.destroy(goal_id);
        return response(res, 200, true, "Success", goal)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}