import { Sequelize } from "sequelize";
import connection from '../config/db.config.js';
import { Saka } from "./sakaModel.js";

export const Sk_Saka = connection.define('sk_sakas', {
    sk_id : {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    saka_id : Sequelize.STRING,
    document : Sequelize.STRING,
    year : Sequelize.INTEGER,
    type : Sequelize.STRING
});

