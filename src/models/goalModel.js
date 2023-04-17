import { Sequelize } from "sequelize";
import connection from "../config/db.config.js";

export const Goal = connection.define('goals',{
    goal_id:{
        primaryKey : true,
        type : Sequelize.STRING
    },
    description : Sequelize.STRING,
    type : Sequelize.STRING
})

export const getAll = () => {
    const goals = Goal.findAll()

    return goals;
}

export const getAllMisi = () => {
    const goals = Goal.findAll({
        where: { type: 'MISI' }
      })

    return goals;
}

export const getAllVisi = () => {
    const goals = Goal.findAll({
        where: { type: 'VISI' }
      })

    return goals;
}
export const store = (type, description) => {
    const goal_id = "GOAL"+Math.random();
    const store = Goal.create({
        goal_id: goal_id,
        type: type,
        description: description
    })
    
    return store;
}

export const update = (goal_id, update) => {
    const edit = Goal.update(update, {
        where: {
            goal_id: goal_id
        }
    });

    return edit
}

export const destroy = (goal_id) => {
    const destroy = Goal.destroy({
        where: {
            goal_id: goal_id
        }
    });

    return destroy
}