const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database');

class Card extends Model {}

Card.init({
  title: DataTypes.TEXT,
  description: DataTypes.TEXT,
  color: DataTypes.TEXT,
  position: DataTypes.SMALLINT,
}, {
  sequelize,
  tableName: 'card',
});

module.exports = Card;