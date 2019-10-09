'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { BIGINT, INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('shares', {
      id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      subject: STRING(255),
      status: INTEGER,
      created_at: DATE,
      updated_at: DATE,
      labels: STRING(30),
      cover: STRING(255),
      link: STRING(255),
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('shares');
  },
};
