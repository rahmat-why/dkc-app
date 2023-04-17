import { Sequelize } from "sequelize";
import connection from "../config/db.config.js";

export const Product = connection.define('products', {
    
    product_id: {
        primaryKey: true,
        type: Sequelize.STRING,
    },
    image: Sequelize.STRING,
    link: Sequelize.STRING,
    name: Sequelize.STRING
});

export const getAll = () => {
    const products = Product.findAll()

    return products;
}

export const store = (image,link, name) => {
    const product_id = "PRD"+Math.random();
    const store = Product.create({
        product_id: product_id,
        image:image,
        link: link,
        name: name
    })
    
    return store;
}

export const update = (product_id, update) => {
    const edit = Product.update(update, {
        where: {
            product_id: product_id
        }
    });

    return edit
}

export const destroy = (product_id) => {
    const destroy = Product.destroy({
        where: {
            product_id: product_id
        }
    });

    return destroy
}