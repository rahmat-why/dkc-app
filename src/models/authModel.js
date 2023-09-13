import { Sequelize } from "sequelize";
import connection from '../config/db.config.js'
import jwt from "jsonwebtoken";
import { Dkr } from "../models/dkrModel.js"

export const Auth = connection.define('auth', {
    auth_id: {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    dkr_id: Sequelize.STRING,
    token: Sequelize.STRING
});

export const store = (dkr_id, token) => {
    const auth_id = "AUTH"+Math.random();
    const store = Auth.create({
        auth_id: auth_id,
        dkr_id: dkr_id,
        token: token,
    })
    
    return store;
}

export const login = (credential) => {
    
    if(credential.username == "dkc123" && credential.password == "pass123") {
        const data = {
            dkr_id: "DKC",
            name: "Admin DKC",
            area_id: "Kab. Bogor",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        return data
    }

    const dkr = Dkr.findOne({
        where: credential
    })
    
    return dkr;
}

export const generateToken = (data) => {
    let token = jwt.sign(data, 'shhhhh', { expiresIn: '365d' });

    return token;
}

export const checkLogin = (token) => {
    let decoded = jwt.verify(token, 'shhhhh');
    
    return decoded;
}