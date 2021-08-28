exports.up = function (knex) {
	return knex.schema.createTable('exemplares', table => {
		table.increments('id').primary();
		table.string('titulo').notNullable();
		table.string('autor').notNullable();
		table.string('edicao').notNullable();
		table.string('editora').notNullable();
		table.integer('estoque').notNullable();
	});
}

exports.down = function (knex) {
	return knex.schema.dropTable('exemplares');
}