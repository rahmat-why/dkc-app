import { Sequelize } from "sequelize";
import connection from "../config/db.config.js";

export const Speech_leader_dkc = connection.define('speech_leader_dkcs', {
    
    speech_id: {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    description: Sequelize.STRING,
    image: Sequelize.STRING,
    name: Sequelize.STRING,
    nta: Sequelize.STRING
});

export const getAll = () => {
    const speech_leader_dkc = Speech_leader_dkc.findAll()

    return speech_leader_dkc;
}

export const store = (description,image,name,nta) => {
    const speech_id = "SPC"+Math.random();
    const store = Speech_leader_dkc.create({
        speech_id: speech_id,
        image: image,
        description:description,
        name: name,
        nta: nta
    })
    
    return store;
}

export const update = (speech_id, update) => {
    const edit = Speech_leader_dkc.update(update, {
        where: {
            speech_id: speech_id
        }
    });

    return edit
}

export const destroy = (speech_id) => {
    const destroy = Speech_leader_dkc.destroy({
        where: {
            speech_id: speech_id
        }
    });

    return destroy
}