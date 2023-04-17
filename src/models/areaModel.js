import { Sequelize } from "sequelize";
import connection from '../config/db.config.js'

export const Area = connection.define('areas', {
    area_id: {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    name: Sequelize.STRING
});