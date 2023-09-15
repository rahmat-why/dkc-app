import { Sequelize } from "sequelize";
import connection from '../config/db.config.js'
import { Scope } from "./scopeModel.js";
import { Stage } from "./stageModel.js";

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
    facebook: Sequelize.STRING,
    position: Sequelize.STRING
});

ProfileOfficer.belongsTo(Scope, { foreignKey: 'scope_id' });
ProfileOfficer.belongsTo(Stage, { foreignKey: 'stage_id' });

export const getAll = () => {
  const profile_officer = ProfileOfficer.findAll({
    order: [
      [Sequelize.literal("position='ANGGOTA', position='BENDAHARA', position='SEKRETARIS II', position='SEKRETARIS', position='WAKIL KETUA', position='KETUA'")],
    ],
    include: [
      {
        model: Scope,
      },
      {
        model: Stage,
      },
    ],
  });

  return profile_officer;
};

export const getByScope = (scope_id) => {
    const profile_officer = ProfileOfficer.findAll({
        where: { scope_id : scope_id },
        include: [
          {
            model: Scope,
          },
          {
            model: Stage,
          },
        ],
        order: [
          [Sequelize.literal("position='ANGGOTA', position='BENDAHARA', position='SEKRETARIS II', position='SEKRETARIS', position='WAKIL KETUA', position='KETUA'")],
        ]
      })

    return profile_officer;
}


export const store = (name, nta, image, stage_id, scope_id, education, city, instagram, facebook, position) => {
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
        facebook: facebook,
        position: position
    })
    
    return store;
}

export const update = (officer_id, update) => {
  const edit = ProfileOfficer.update(update, {
      where: {
        officer_id: officer_id
      }
  });

  return edit
}

export const destroy = (officer_id) => {
    const destroy = ProfileOfficer.destroy({
        where: {
            officer_id: officer_id
        }
    });

    return destroy
}