import { Sequelize } from "sequelize";
import connection from '../config/db.config.js'
import { School } from "./schoolModel.js";
import { Stage } from "./stageModel.js";

export const DataPotensi = connection.define('data_potensi', {
    data_id: {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    dkr_id: Sequelize.STRING,
    school_id: Sequelize.STRING,
    stage_id: Sequelize.STRING,
    mens_member: Sequelize.STRING,
    womens_member: Sequelize.STRING,
    total_member: Sequelize.STRING,
    year: Sequelize.STRING
});

DataPotensi.belongsTo(Stage, { foreignKey: 'stage_id' });

export const getAll = (dkr_id, school_id) => {
    const data_potensi = DataPotensi.findAll({
        where:{
            school_id: school_id,
            dkr_id: dkr_id
        },
        include: [School, Stage]
    })

    return data_potensi;
}

export const store = (dkr_id, school_id, stage_id, mens_member, womens_member, year) => {
    const data_id = "DP"+Math.random();
    const total_member = parseInt(mens_member)+parseInt(womens_member);
    const store = DataPotensi.create({
        data_id: data_id,
        dkr_id: dkr_id,
        school_id: school_id,
        stage_id: stage_id,
        mens_member: mens_member,
        womens_member: womens_member,
        total_member: total_member,
        year: year
    })
    
    return store;
}

export const destroy = (dkr_id, school_id) => {
    const destroy = DataPotensi.destroy({
        where: {
            dkr_id: dkr_id,
            school_id
        }
    });

    return destroy
}