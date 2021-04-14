module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define('Comment', {
    name: {},
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  Hashtag.associate = (db) => {};
  return Hashtag;
}