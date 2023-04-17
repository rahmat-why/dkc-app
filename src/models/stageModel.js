import { Sequelize } from "sequelize";
import connection from '../config/db.config.js'

export const Stage = connection.define('stages', {
    stage_id: {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    name: Sequelize.STRING
});