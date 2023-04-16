import { Sequelize } from "sequelize";
import connection from '../config/db.config.js'

export const School = connection.define('school', {
    school_id: {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    dkr_id: Sequelize.STRING,
    gudep_number: Sequelize.STRING,
    school_name: Sequelize.STRING
});

export const getAll = () => {
    const schools = School.findAll()

    return schools;
}

export const store = (dkr_id, gudep_number, school_name) => {
    const school_id = "SCH"+Math.random();
    const store = School.create({
        school_id: school_id,
        dkr_id: dkr_id,
        gudep_number: gudep_number,
        school_name: school_name
    })
    
    return store;
}

export const update = (school_id, update) => {
    const edit = School.update(update, {
        where: {
            school_id: school_id
        }
    });

    return edit
}

export const destroy = (school_id) => {
    const destroy = School.destroy({
        where: {
            school_id: school_id
        }
    });

    return destroy
}