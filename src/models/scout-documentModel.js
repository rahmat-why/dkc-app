import { Sequelize } from "sequelize";
import connection from "../config/db.config.js";

export const Scout_document = connection.define('scout_documents', {
    
    document_id: {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    document: Sequelize.STRING,
    name: Sequelize.STRING
});

export const getAll = () => {
    const scout_documents = Scout_document.findAll()

    return scout_documents;
}

export const store = (document, name) => {
    const document_id = "DOC"+Math.random();
    const store = Scout_document.create({
        document_id: document_id,
        document: document,
        name: name
    })
    
    return store;
}

export const update = (document_id, update) => {
    const edit = Scout_document.update(update, {
        where: {
            document_id: document_id
        }
    });

    return edit
}

export const destroy = (document_id) => {
    const destroy = Scout_document.destroy({
        where: {
            document_id: document_id
        }
    });

    return destroy
}