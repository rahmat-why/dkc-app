import { Sequelize } from "sequelize";
import connection from "../config/db.config.js";

export const Agenda = connection.define('agendas',{
    
    agenda_id :{
        primaryKey : true,
        type : Sequelize.STRING
    },
    title : Sequelize.STRING,
    scheduleAt : Sequelize.STRING
})

export const getAll = () => {
    const agendas = Agenda.findAll()

    return agendas;
}

export const store = (title, scheduleAt) => {
    const agenda_id = "AGD"+Math.random();
    const store = Agenda.create({
        agenda_id: agenda_id,
        title: title,
        scheduleAt: scheduleAt
    })
    
    return store;
}

export const update = (agenda_id, update) => {
    const edit = Agenda.update(update, {
        where: {
            agenda_id: agenda_id
        }
    });

    return edit
}

export const destroy = (agenda_id) => {
    const destroy = Agenda.destroy({
        where: {
            agenda_id: agenda_id
        }
    });

    return destroy
}