'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`DROP TABLE IF EXISTS users`)
    .then(res => {
      return queryInterface.createTable('users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        age: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        address: {
          type: Sequelize.JSONB,
          allowNull: true,
          defaultValue: null
        },
        additional_info: {
          type: Sequelize.JSONB,
          allowNull: true,
          defaultValue: null
        }
      })
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
