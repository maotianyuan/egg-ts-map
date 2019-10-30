
module.exports = app => {
  const { BIGINT, STRING, DATE } = app.Sequelize;
  const BookmarkList = app.model.define('bookmark_list', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    subject: STRING(255),
    type: BIGINT,
    created_at: DATE,
    updated_at: DATE,
    icon: STRING(255),
    link: STRING(255),
    type: BIGINT,
    tag: BIGINT,
  });
  BookmarkList.associate = function (){
    app.model.BookmarksList.belongsTo(app.model.BookmarksType, {
      foreignKey: 'type',
      targetKey: 'id'
    })
    app.model.BookmarksList.belongsTo(app.model.BookmarksTag, {
      foreignKey: 'tag',
      targetKey: 'id'
    })
  }
  return BookmarkList;
};