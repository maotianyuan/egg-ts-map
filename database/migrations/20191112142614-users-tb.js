'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { BIGINT, STRING, DATE, INTEGER } = Sequelize;
    await queryInterface.createTable('users_tbs', {
      id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      user_name: STRING(80),
      name: STRING(60),
      password: STRING(60),
      status: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('users_tbs');
  },
};
