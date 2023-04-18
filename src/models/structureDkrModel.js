import { Sequelize } from "sequelize";
import connection from '../config/db.config.js'
import { Dkr } from "./dkrModel.js";

export const StructureDkr = connection.define('structure_dkrs', {
    structure_id : {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    dkr_id: Sequelize.STRING,
    image: Sequelize.STRING,
    year: Sequelize.STRING
});

StructureDkr.belongsTo(Dkr, { foreignKey: 'dkr_id' });

export const getAll = (dkr_id) => {
    const structure_dkr = StructureDkr.findAll({
        where: {
            dkr_id: dkr_id
        },
        include: Dkr
    })

    return structure_dkr;
}

export const store = (dkr_id, image, year) => {
    const destroy_sctructure = destroy(dkr_id)
    if(destroy_sctructure){
        const structure_id = "STRC"+Math.random();
        const store = StructureDkr.create({
            structure_id: structure_id,
            dkr_id: dkr_id,
            image: image,
            year: year
        })
        
        return store;
    }
}

export const destroy = (dkr_id) => {
    const destroy = StructureDkr.destroy({
        where: {
            dkr_id: dkr_id
        }
    });

    return destroy
}