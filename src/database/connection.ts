const knex = require('knex');
const pathLocal = require('path');

module.exports = knex({
  useNullAsDefault: true,
  client: 'sqlite3',
  connection: {
    filename: pathLocal.resolve(__dirname, 'database.sqlite'),
  },
});
