import { Sequelize } from "sequelize";
import connection from '../config/db.config.js'

export const DataPotensi = connection.define('data_potensi', {
    data_id: {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    dkr_id: Sequelize.STRING,
    school_id: Sequelize.STRING,
    stage_id: Sequelize.STRING,
    total_member: Sequelize.STRING,
    year: Sequelize.STRING
});

export const getAll = () => {
    const data_potensi = DataPotensi.findAll()

    return data_potensi;
}

export const store = (dkr_id, school_id, stage_id, total_member, year) => {
    const data_id = "DP"+Math.random();
    const store = DataPotensi.create({
        data_id: data_id,
        dkr_id: dkr_id,
        school_id: school_id,
        stage_id: stage_id,
        total_member: total_member,
        year: year
    })
    
    return store;
}

export const destroy = (dkr_id) => {
    const destroy = DataPotensi.destroy({
        where: {
            dkr_id: dkr_id
        }
    });

    return destroy
}