import response from '../response.js'
import * as authModel from "../models/authModel.js"
import { callSlackApi } from '../services/slackService.js';

export async function login(req, res) {
    try {
        const { username, password } = req.body
        const login = await authModel.login({ username: username, password: password });
        
        if(!login) {
            return response(res, 500, false, "Incorrect", {})
        }else{
            var type = "DKR"
            if(login.dkr_id == "DKC") {
                var type = "DKC"
            }

            let data = {
                data: login,
                type: type,
                loginAt: Date.now()
            }

            let token = authModel.generateToken(data)
            return response(res, 200, false, "Success berhasil login!", {token: token, type: type})
        }
        
    }catch(e) {
        callSlackApi(e.message + "| in loginController@login");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}

export async function checkLogin(req, res) {
    try{
        let authorization = req.headers["authorization"].split(" ")
        const token = authorization[1]

        const check_login = authModel.checkLogin(token);
        return response(res, 200, true, "Token valid!", check_login)
    }catch(e) {
        callSlackApi(e.message + "| in loginController@checkLogin");
        return response(res, 500, false, "Error silahkan hubungi admin! "+e.message, {})
    }
}
