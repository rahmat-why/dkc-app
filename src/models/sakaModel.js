import { Sequelize } from "sequelize";
import connection from '../config/db.config.js';

export const Saka = connection.define('sakas', {
    saka_id : {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    name : Sequelize.STRING,
    document_sk_saka : Sequelize.STRING,
    document_sk_pinsaka : Sequelize.STRING
});

export const getAll = () => {
   const sakas = Saka.findAll({
      attributes : {
         exclude : ['createdAt', 'updatedAt']
      }
   });

 return sakas;
};

export const store = (name, document_sk_saka, document_sk_pinsaka) => {
   const saka_id = "SAKA"+Math.random();
   const store = Saka.create({
      saka_id: saka_id,
      name: name,
      document_sk_saka: document_sk_saka,
      document_sk_pinsaka : document_sk_pinsaka
   })

   console.log(store);
   
   return store;
}

export const updateDocumentSkSaka = async (saka_id, document_sk_saka) => {
   try {
       const update = await Saka.update({ document_sk_saka }, {
           where: {
               saka_id
           }
       });

       return update;
   } catch (error) {
       throw error;
   }
}

export const updateDocumentSkPinsaka = async (saka_id, document_sk_pinsaka) => {
   try {
       const update = await Saka.update({ document_sk_pinsaka }, {
           where: {
               saka_id
           }
       });

       return update;
   } catch (error) {
       throw error;
   }
}

export const update = (saka_id, update) => {
   const edit = Saka.update(update, {
       where: {
           saka_id: saka_id
       }
   });

   return edit
}

export const destroy = (saka_id) => {
   const saka = Saka.destroy({
       where: {
           saka_id: saka_id
       }
   });

   return saka;
}
