exports.up = function (knex) {
	return knex.schema.createTable('discentes', table => {
		table.increments('id').unsigned().primary();
		table.string('nome').notNullable();
		table.string('matricula').notNullable();
		table.string('senha').notNullable();
		table.specificType('interesse', 'INT[]');
	});
}

exports.down = function (knex) {
	return knex.schema.dropTable('discentes');
}