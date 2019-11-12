
module.exports = app => {
  const { BIGINT, STRING, DATE, INTEGER } = app.Sequelize;
  const UserList = app.model.define('users_tb', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    user_name: STRING(80),
    name: STRING(60),
    password: STRING(60),
    status: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });
  return UserList;
};