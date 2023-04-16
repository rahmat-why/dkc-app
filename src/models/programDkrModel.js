import { Sequelize } from "sequelize";
import connection from '../config/db.config.js'

export const ProgramDkr = connection.define('program_dkr', {
    program_id: {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    dkr_id: Sequelize.STRING,
    month: Sequelize.STRING,
    year: Sequelize.STRING,
    program_name: Sequelize.STRING
});

export const getAll = () => {
    const program_dkrs = ProgramDkr.findAll()

    return program_dkrs;
}

export const store = (dkr_id, month, year, program_name) => {
    const program_id = "PRGR"+Math.random();
    const store = ProgramDkr.create({
        program_id: program_id,
        dkr_id: dkr_id,
        month: month,
        year: year,
        program_name: program_name
    })
    
    return store;
}

export const update = (program_id, update) => {
    const edit = ProgramDkr.update(update, {
        where: {
            program_id: program_id
        }
    });

    return edit
}

export const destroy = (program_id) => {
    const destroy = ProgramDkr.destroy({
        where: {
            program_id: program_id
        }
    });

    return destroy
}