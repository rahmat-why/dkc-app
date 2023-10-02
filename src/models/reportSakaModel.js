import { Sequelize } from "sequelize";
import connection from '../config/db.config.js';
import { Saka } from "./sakaModel.js";

export const Reportsaka = connection.define('report_sakas', {
    report_id : {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    saka_id : Sequelize.STRING,
    name : Sequelize.STRING,
    report_date : Sequelize.STRING,
    document : Sequelize.STRING
});

Reportsaka.belongsTo(Saka, { foreignKey: 'saka_id' } )

export const getAll = () => {
    const Reportsakas = Reportsaka.findAll({
       attributes : {
          exclude : ['createdAt', 'updatedAt']
       }
    });
 
  return Reportsakas;
};

export const store = (saka_id, name, report_date, document) => {
   const report_id = "RPK"+Math.random();
   const store = Reportsaka.create({
      report_id: report_id,
      saka_id: saka_id,
      name: name,
      report_date : report_date,
      document : document
   })
   
   return store;
}

export const update = (report_id, update) => {
    const edit = Reportsaka.update(update, {
        where: {
            report_id: report_id
        }
    });
 
    return edit
}

export const destroy = (report_id) => {
    const report_saka = Reportsaka.destroy({
        where: {
            report_id: report_id
        }
    });
 
    return report_saka;
 }