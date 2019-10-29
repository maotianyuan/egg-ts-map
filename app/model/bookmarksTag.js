
module.exports = app => {
  const { BIGINT, STRING, DATE } = app.Sequelize;
  const BookmarkTag = app.model.define('bookmark_tag', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    subject: STRING(255),
    type: BIGINT,
    created_at: DATE,
    updated_at: DATE,
  });
  BookmarkTag.associate = function (){
    app.model.BookmarksTag.belongsTo(app.model.BookmarksType, {
      foreignKey: 'type',
      targetKey: 'id'
    })
  }
  return BookmarkTag;
};