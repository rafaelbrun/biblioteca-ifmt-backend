exports.up = function (knex: any) {
  return knex.schema.createTable('reservas', (table: any) => {
    table.increments('id').unsigned().primary();
    table.integer('id_exemplar').unsigned();
    table.foreign('id_exemplar').references('id').inTable('exemplares');
    table.integer('id_discente').unsigned();
    table.foreign('id_discente').references('id').inTable('discentes');
    table.datetime('validade');
  });
};

exports.down = function (knex: any) {
  return knex.schema.dropTable('reservas');
};
