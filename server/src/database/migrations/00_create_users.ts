import Knex from 'knex';

//Quais alterações a gente quer no BD
export async function up(Knex: Knex){
    return Knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();        
    });
}

export async function down(Knex: Knex){
    Knex.schema.dropTable('users');
}