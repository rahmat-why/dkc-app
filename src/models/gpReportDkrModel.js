import { Sequelize } from "sequelize";
import connection from '../config/db.config.js'
import { Dkr } from "./dkrModel.js";

export const GpReportDkr = connection.define('gp_report_dkr', {
    report_id: {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    dkr_id: Sequelize.STRING,
    document: Sequelize.STRING,
    name: Sequelize.STRING,
    type: Sequelize.STRING,
    year: Sequelize.STRING,
});

GpReportDkr.belongsTo(Dkr, { foreignKey: 'dkr_id' });

export const getAll = (dkr_id, type) => {
    const gp_report_dkr = GpReportDkr.findAll({
        where: {
            dkr_id: dkr_id,
            type: type
        },
        include: Dkr
    })

    return gp_report_dkr;
}

export const store = (dkr_id, document, name, type) => {
    const report_id = "RPR"+Math.random();
    const store = GpReportDkr.create({
        report_id: report_id,
        dkr_id: dkr_id,
        document: document,
        name: name,
        type: type,
        year: year
    })
    
    return store;
}

export const destroy = (report_id) => {
    const destroy = GpReportDkr.destroy({
        where: {
            report_id: report_id
        }
    });

    return destroy
}