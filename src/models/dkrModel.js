import { Sequelize } from "sequelize";
import connection from '../config/db.config.js'
import { Area } from "./areaModel.js";

export const Dkr = connection.define('dkrs', {
    dkr_id: {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    name: Sequelize.STRING,
    area_id: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    document_sk_dkr: Sequelize.STRING,
    image_structure_dkr: Sequelize.STRING
});

Dkr.belongsTo(Area, { foreignKey: 'area_id' });

export const getAll = () => {
    const dkrs = Dkr.findAll({
        include: Area,
        attributes: ["dkr_id", "area_id", 'name', "username", "document_sk_dkr", "image_structure_dkr"]
    })

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
        where : { area_id : area_id},
        attributes: ["dkr_id", "area_id", 'name']
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
    console.log([dkr_id, update])
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

export const getStructureDkr = (dkr_id) => {
    const dkrs = Dkr.findOne({
        where : { dkr_id : dkr_id},
        attributes: ["dkr_id", "image_structure_dkr"]
    })

    return dkrs;
}

export const getSkDkr = (dkr_id) => {
    const dkrs = Dkr.findOne({
        where : { dkr_id : dkr_id},
        attributes: ["dkr_id", "document_sk_dkr"]
    })

    return dkrs;
}