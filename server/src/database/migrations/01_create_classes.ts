import Knex from 'knex';

//Quais alterações a gente quer no BD
export async function up(Knex: Knex){
    return Knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();
        
        //Relacionamento - chave estrangeira
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            
            //caso um professor seja deletado, as aulas também são
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        ;

    });
}

export async function down(Knex: Knex){
    Knex.schema.dropTable('classes');
}