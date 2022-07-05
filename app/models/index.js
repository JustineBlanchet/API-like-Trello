const List = require('./list');
const Card = require('./card');
const Tag = require('./tag');

Card.belongsTo(List, {
  as: 'list',
  foreignKey: 'list_id',
});

List.hasMany(Card, {
  as: 'cards',
  foreignKey: 'list_id',
});

Card.belongsToMany(Tag, {
  as: 'tags',
  through: 'card_has_tag',
  foreignKey: 'card_id',
  otherKey: 'tag_id',
  updatedAt: false,
});

Tag.belongsToMany(Card, {
  as: 'cards',
  through: 'card_has_tag',
  foreignKey: 'tag_id',
  otherKey: 'card_id',
  updatedAt: false,
});


module.exports = { Card, List, Tag };