import { Sequelize } from "sequelize";
import connection from "../config/db.config.js";

export const Achievement = connection.define('achievements',{
    
    achievement_id :{
        primaryKey : true,
        type : Sequelize.STRING
    },
    description : Sequelize.STRING,
    title : Sequelize.STRING
})

export const getAll = () => {
    const achievements = Achievement.findAll()

    return achievements;
}

export const store = (description, title) => {
    const achievement_id = "ACH"+Math.random();
    const store = Achievement.create({
        achievement_id: achievement_id,
        description: description,
        title: title
    })
    
    return store;
}

export const update = (achievement_id, update) => {
    const edit = Achievement.update(update, {
        where: {
            achievement_id: achievement_id
        }
    });

    return edit
}

export const destroy = (achievement_id) => {
    const destroy = Achievement.destroy({
        where: {
            achievement_id: achievement_id
        }
    });

    return destroy
}