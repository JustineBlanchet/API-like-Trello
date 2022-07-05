const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    underscored: true, // utilisation du snake_case par défaut
  }
});

module.exports = sequelize;