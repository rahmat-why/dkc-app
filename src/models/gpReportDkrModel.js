import { Sequelize } from "sequelize";
import connection from '../config/db.config.js'

export const GpReportDkr = connection.define('gp_report_dkr', {
    report_id: {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    dkr_id: Sequelize.STRING,
    document: Sequelize.STRING,
    name: Sequelize.STRING,
    type: Sequelize.STRING
});

export const getAll = () => {
    const gp_report_dkr = GpReportDkr.findAll()

    return gp_report_dkr;
}

export const store = (dkr_id, document, name, type) => {
    const report_id = "RPR"+Math.random();
    const store = GpReportDkr.create({
        report_id: report_id,
        dkr_id: dkr_id,
        document: document,
        name: name,
        type: type
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