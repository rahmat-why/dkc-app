import { Sequelize } from "sequelize";
import connection from "../config/db.config.js";

export const Banner = connection.define('banners', {
    
    banner_id: {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    image: Sequelize.STRING,
    type: Sequelize.STRING
});

export const getAll = () => {
    const banners = Banner.findAll()

    return banners;
}

export const store = (image, type) => {
    const banner_id = "LYR"+Math.random();
    const store = Banner.create({
        banner_id: banner_id,
        image: image,
        type: type
    })
    
    return store;
}

export const update = (banner_id, update) => {
    const edit = Banner.update(update, {
        where: {
            banner_id: banner_id
        }
    });

    return edit
}

export const destroy = (banner_id) => {
    const destroy = Banner.destroy({
        where: {
            banner_id: banner_id
        }
    });

    return destroy
}