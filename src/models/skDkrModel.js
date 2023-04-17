import { Sequelize } from "sequelize";
import connection from '../config/db.config.js'
import { Dkr } from "./dkrModel.js";

export const SkDkr = connection.define('sk_dkr', {
    sk_id: {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    dkr_id: Sequelize.STRING,
    document: Sequelize.STRING,
    year: Sequelize.STRING
});

SkDkr.belongsTo(Dkr, { foreignKey: 'dkr_id' });

export const getAll = (dkr_id) => {
    const sk_dkr = SkDkr.findAll({
        where: {
            dkr_id: dkr_id
        },
        include: Dkr
    })

    return sk_dkr;
}

export const store = (dkr_id, document, year) => {
    const sk_id = "SK"+Math.random();
    const store = SkDkr.create({
        sk_id: sk_id,
        dkr_id: dkr_id,
        document: document,
        year: year
    })
    
    return store;
}

export const destroy = (sk_id) => {
    const destroy = SkDkr.destroy({
        where: {
            sk_id: sk_id
        }
    });

    return destroy
}