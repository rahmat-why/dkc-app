import response from '../response.js'
import * as authModel from "../models/authModel.js"

const loginMiddleware = async(req, res, next) => {
    try{
        let authorization = req.headers["authorization"].split(" ")
        const token = authorization[1]
        authModel.checkLogin(token);
        next()

    }catch(e) {
        return response(res, 500, false, e, {})
    }
}

export default loginMiddleware