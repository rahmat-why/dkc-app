import response from '../response.js'
import * as profileOfficerModel from "../models/profileOfficerModel.js"

export async function getAll(req, res) {
    try {
        const profile_officer = await profileOfficerModel.getAll();
        return response(res, 200, true, "Success", profile_officer)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function getByScope(req, res) {
    try {
        const { scope_id } = req.params
        const profile_officer = await profileOfficerModel.getByScope(scope_id);
        return response(res, 200, true, "Success", profile_officer)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function store(req, res) {
    try {
        const { name, nta, stage_id, scope_id, education, city, instagram, position } = req.body
        const { filename } = req.file
        let facebook = null
        
        const image_url = "/profile-officer/"+filename;

        const profile_officer = await profileOfficerModel.store(name, nta, image_url, stage_id, scope_id, education, city, instagram, facebook, position);
        return response(res, 200, true, "Success", profile_officer)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function update(req, res) {
    try{
        const { officer_id } = req.params
        const update = {
            name: req.body.name,
            nta : req.body.nta,
            stage_id : req.body.stage_id,
            scope_id : req.body.scope_id,
            education : req.body.education,
            city : req.body.city,
            instagram : req.body.instagram,
            facebook : null,
            position : req.body.position
        }

        const profile_officers = await profileOfficerModel.update(officer_id, update);
        return response(res, 200, true, "Success", profile_officers)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export async function destroy(req, res) {
    try{
        const { officer_id } = req.params
        const profile_officer = await profileOfficerModel.destroy(officer_id);
        return response(res, 200, true, "Success", profile_officer)
    }catch(e) {
        return response(res, 500, false, e, {})
    }
}