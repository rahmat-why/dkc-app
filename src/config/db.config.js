import { Sequelize } from "sequelize";

const connection = new Sequelize("dev_dkc", "kabbogor", "Dkcdkc111", {
    host: "103.175.216.90",
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

export default connection
