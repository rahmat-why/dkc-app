import { Sequelize } from "sequelize";
import connection from '../config/db.config.js'

export const Scope = connection.define('scopes', {
    scope_id: {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    name: Sequelize.STRING
});