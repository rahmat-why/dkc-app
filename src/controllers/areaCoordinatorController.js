import response from '../response.js'
import * as areaCoordinatorModel from "../models/areaCoordinatorModel.js"
import { callSlackApi } from '../services/slackService.js';

export async function getAll(req, res) {
    try {
        const area_coordinator = await areaCoordinatorModel.getAll();
        return response(res, 200, true, "Success data berhasil ditampilkan!", area_coordinator)
    }catch(e) {
        callSlackApi(e.message + "| in areaCoordinatorController@getAll");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function store(req, res) {
    try {
        const { name, nta, area_id } = req.body
        const { filename } = req.file
        
        const image_url = "/area-coordinator/"+filename;

        const area_coordinator = await areaCoordinatorModel.store(name, nta, image_url, area_id );
        return response(res, 200, true, "Success data berhasil ditambah!", area_coordinator)
    }catch(e) {
        callSlackApi(e.message + "| in areaCoordinatorController@store");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function destroy(req, res) {
    try{
        const { coordinator_id } = req.params
        const area_coordinator = await areaCoordinatorModel.destroy(coordinator_id);
        return response(res, 200, true, "Success data berhasil dihapus!", area_coordinator)
    }catch(e) {
        callSlackApi(e.message + "| in areaCoordinatorController@destroy");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}