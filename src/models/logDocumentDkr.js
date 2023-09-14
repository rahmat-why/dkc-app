import { Sequelize } from "sequelize";
import connection from '../config/db.config.js'
import { Dkr } from "./dkrModel.js";

export const LogDocumentDkr = connection.define('log_document_dkrs', {
    document_id: {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    dkr_id: Sequelize.STRING,
    document: Sequelize.STRING,
    year: Sequelize.STRING,
    type: Sequelize.STRING,
});

LogDocumentDkr.belongsTo(Dkr, { foreignKey: 'dkr_id' });

export const store = async (dkr_id, document, year, type) => {
    // Check if a record with the same dkr_id and year exists
    const existingRecord = await LogDocumentDkr.findOne({
        where: {
            dkr_id: dkr_id,
            year: year,
            type: type
        }
    });

    if (existingRecord) {
        // If a record exists, update it
        await existingRecord.update({
            document: document,
            type: type,
        });
        return existingRecord; // Return the updated record
    } else {
        // If no record exists, create a new one
        const document_id = "DCM" + Math.random();
        const newRecord = await LogDocumentDkr.create({
            document_id: document_id,
            dkr_id: dkr_id,
            document: document,
            year: year,
            type: type,
        });
        return newRecord; // Return the newly created record
    }
};
