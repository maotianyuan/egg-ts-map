'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { BIGINT, STRING, DATE } = Sequelize;
    await queryInterface.createTable('bookmark_types', {
      id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      subject: STRING(255),
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('bookmark_types');
  },
};
