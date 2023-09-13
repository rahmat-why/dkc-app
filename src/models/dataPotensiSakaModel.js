import { Sequelize } from "sequelize";
import connection from '../config/db.config.js';
import { Dkr } from "./dkrModel.js";
import { Saka } from "./sakaModel.js";

export const DataPotensiSaka = connection.define('data_potensi_sakas', {
    data_id : {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    saka_id : Sequelize.STRING,
    dkr_id : Sequelize.STRING,
    total_member : Sequelize.INTEGER,
    mens_member : Sequelize.INTEGER,
    womens_member : Sequelize.INTEGER,
    year : Sequelize.INTEGER
});

DataPotensiSaka.belongsTo(Dkr, { foreignKey : 'dkr_id' });
DataPotensiSaka.belongsTo(Saka, { foreignKey : 'saka_id' });

export const getAll = () => {
    const DataPotensiSakas = DataPotensiSaka.findAll({
       attributes : {
          exclude : ['createdAt', 'updatedAt']
       }
    });
 
  return DataPotensiSakas;
};

export const store = (saka_id, dkr_id, total_member, mens_member, womens_member, year) => {
    const data_id = "DPK"+Math.random();
    const store = DataPotensiSaka.create({
        data_id: data_id,
        saka_id: saka_id,
        dkr_id: dkr_id,
        total_member : total_member,
        mens_member : mens_member,
        womens_member : womens_member,
        year : year
    })
    
    return store;
 }