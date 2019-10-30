'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { BIGINT, STRING, DATE } = Sequelize;
    await queryInterface.createTable('bookmark_lists', {
      id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      subject: STRING(255),
      created_at: DATE,
      updated_at: DATE,
      icon: STRING(255),
      link: STRING(255),
      type: BIGINT,
      tag: BIGINT,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('bookmark_lists');
  },
};
