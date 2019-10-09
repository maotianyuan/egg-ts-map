
module.exports = app => {
  const { BIGINT, STRING, INTEGER, DATE } = app.Sequelize;
  const User = app.model.define('share', {
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
  return User;
};