'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    date: DataTypes.STRING,
    name: DataTypes.STRING,
    status: DataTypes.INTEGER,
    describe: DataTypes.STRING,
    userName: DataTypes.STRING
  }, {});
  List.associate = function(models) {
    // associations can be defined here
  };
  return List;
};