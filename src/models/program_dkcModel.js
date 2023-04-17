import { Sequelize } from "sequelize";
import connection from "../config/db.config.js";

export const Program_dkc = connection.define('program_dkcs',{
    program_id:{
        primaryKey : true,
        type : Sequelize.STRING
    },
    program_name : Sequelize.STRING,
    year : Sequelize.STRING
})

export const getAll = () => {
    const program_dkc = Program_dkc.findAll()

    return program_dkc;
}

export const store = (program_name, year) => {
    const program_id = "PRC"+Math.random();
    const store = Program_dkc.create({
        program_id: program_id,
        program_name: program_name,
        year: year
    })
    
    return store;
}

export const update = (program_id, update) => {
    const edit = Program_dkc.update(update, {
        where: {
            program_id: program_id
        }
    });

    return edit
}

export const destroy = (program_id) => {
    const destroy = Program_dkc.destroy({
        where: {
            program_id: program_id
        }
    });

    return destroy
}