exports.up = function (knex: any) {
  return knex.schema.createTable('exemplares', (table: any) => {
    table.increments('id').unsigned().primary();
    table.string('titulo').notNullable();
    table.string('autor').notNullable();
    table.string('edicao').notNullable();
    table.string('editora').notNullable();
    table.integer('estoque').notNullable();
  });
};

exports.down = function (knex: any) {
  return knex.schema.dropTable('exemplares');
};
