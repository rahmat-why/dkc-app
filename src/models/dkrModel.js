import { Sequelize } from "sequelize";
import connection from '../config/db.config.js'
import jwt from "jsonwebtoken";

export const Dkr = connection.define('dkrs', {
    dkr_id: {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    name: Sequelize.STRING,
    area_id: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING
});

export const getAll = () => {
    const dkrs = Dkr.findAll()

    return dkrs;
}

export const getByDkr_id = (dkr_id) => {
    const dkrs = Dkr.findAll({
        where : { dkr_id : dkr_id }
    })

    return dkrs;
}

export const getByArea = (area_id) => {
    const dkrs = Dkr.findAll({
        where : { area_id : area_id}
    })

    return dkrs;
}

export const store = (name, area_id, username, password) => {
    const dkr_id = "DKR"+Math.random();
    const store = Dkr.create({
        dkr_id: dkr_id,
        name: name,
        area_id: area_id,
        username: username,
        password: password
    })
    
    return store;
}

export const update = (dkr_id, update) => {
    const edit = Dkr.update(update, {
        where: {
            dkr_id: dkr_id
        }
    });

    return edit
}

export const destroy = (dkr_id) => {
    const destroy = Dkr.destroy({
        where: {
            dkr_id: dkr_id
        }
    });

    return destroy
}