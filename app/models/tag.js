const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database');

class Tag extends Model {}

Tag.init({
  title: DataTypes.TEXT,
  color: DataTypes.TEXT,
}, {
  sequelize,
  tableName: 'tag',
});

module.exports = Tag;