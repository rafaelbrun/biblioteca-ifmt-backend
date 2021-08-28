exports.up = function (knex) {
    return knex.schema.createTable('reservas', table => {
        table.increments('id').unsigned().primary();
        table.integer('id_exemplar').unsigned();
        table.foreign('id_exemplar').references('id').inTable('exemplares');
		table.integer('id_discente').unsigned();
		table.foreign('id_discente').references('id').inTable('discentes');
        table.datetime('validade');
    });
}

exports.down = function (knex) {
    return knex.schema.dropTable('reservas');
}