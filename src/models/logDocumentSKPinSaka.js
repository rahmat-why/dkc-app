import { Sequelize } from "sequelize";
import connection from '../config/db.config.js'
import { Saka } from "./sakaModel.js";

export const LogDocumentSKPinSaka = connection.define('log_document_skpinsakas', {
    document_id: {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    saka_id: Sequelize.STRING,
    document: Sequelize.STRING,
    year: Sequelize.STRING,
    type: Sequelize.STRING,
});

LogDocumentSKPinSaka.belongsTo(Saka, { foreignKey: 'saka_id' });

export const store = async (saka_id, document, year, type) => {
    // Check if a record with the same dkr_id and year exists
    const existingRecord = await LogDocumentSKPinSaka.findOne({
        where: {
            saka_id: saka_id,
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
        const newRecord = await LogDocumentSKPinSaka.create({
            document_id: document_id,
            saka_id: saka_id,
            document: document,
            year: year,
            type: type,
        });
        return newRecord; // Return the newly created record
    }
};