exports.up = function (knex: any) {
  return knex.schema.createTable('discentes', (table: any) => {
    table.increments('id').unsigned().primary();
    table.string('nome').notNullable();
    table.string('matricula').notNullable();
    table.string('senha').notNullable();
    table.string('interesse');
    table.string('alertas');
  });
};

exports.down = function (knex: any) {
  return knex.schema.dropTable('discentes');
};
