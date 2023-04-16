import { Sequelize } from "sequelize";
import connection from '../config/db.config.js'

export const StructureDkr = connection.define('structure_dkrs', {
    structure_id : {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    dkr_id: Sequelize.STRING,
    image: Sequelize.STRING,
    year: Sequelize.STRING
});

export const getAll = () => {
    const structure_dkr = StructureDkr.findAll()

    return structure_dkr;
}

export const store = (dkr_id, image, year) => {
    const report_id = "STRC"+Math.random();
    const store = StructureDkr.create({
        report_id: report_id,
        dkr_id: dkr_id,
        image: image,
        year: year
    })
    
    return store;
}

export const destroy = (report_id) => {
    const destroy = StructureDkr.destroy({
        where: {
            report_id: report_id
        }
    });

    return destroy
}