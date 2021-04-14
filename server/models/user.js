module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { // MySql에는 users 테이블 생성
    // id가 기본적으로 들어 있습니다(mysql에)
    email: {
      type: DataTypes.STRING(30),
      allowNull: false, // 필수
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });

  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked'});
  };
  return User;
}