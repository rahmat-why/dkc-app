import { Sequelize } from "sequelize";
import connection from '../config/db.config.js'

export const ProfileOfficer = connection.define('profile_officer', {
    officer_id: {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    name: Sequelize.STRING,
    nta: Sequelize.STRING,
    image: Sequelize.STRING,
    stage_id: Sequelize.STRING,
    scope_id: Sequelize.STRING,
    education: Sequelize.STRING,
    city: Sequelize.STRING,
    instagram: Sequelize.STRING,
    facebook: Sequelize.STRING
});

export const getAll = () => {
    const profile_officer = ProfileOfficer.findAll()

    return profile_officer;
}

export const getByScope = (scope_id) => {
    const profile_officer = ProfileOfficer.findAll({
        where: { scope_id : scope_id }
      })

    return profile_officer;
}


export const store = (name, nta, image, stage_id, scope_id, education, city, instagram, facebook) => {
    const officer_id = "OFC"+Math.random();
    const store = ProfileOfficer.create({
        officer_id: officer_id,
        name: name,
        nta: nta,
        image: image,
        stage_id: stage_id,
        scope_id: scope_id,
        education: education,
        city: city,
        instagram: instagram,
        facebook: facebook
    })
    
    return store;
}

export const destroy = (officer_id) => {
    const destroy = ProfileOfficer.destroy({
        where: {
            officer_id: officer_id
        }
    });

    return destroy
}