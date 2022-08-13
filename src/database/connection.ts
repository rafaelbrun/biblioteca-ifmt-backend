const pathLocal = require('path');

const knex = require('knex');

module.exports = knex({
  client: 'sqlite3',
  connection: {
    filename: pathLocal.resolve(__dirname, 'database.sqlite'),
  },
  useNullAsDefault: true,
});
