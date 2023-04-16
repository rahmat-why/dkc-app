import { Sequelize } from "sequelize";

const connection = new Sequelize('db_dkc', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

export default connection
