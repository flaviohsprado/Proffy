import Knex from 'knex';

//Quais alterações a gente quer no BD
export async function up(Knex: Knex){
    return Knex.schema.createTable('connections', table => {
        table.increments('id').primary();        
        
        //Relacionamento - chave estrangeira
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            
            //caso um professor seja deletado, as aulas também são
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        ;

        table.timestamp('created_at')
            .defaultTo(Knex.raw('CURRENT_TIMESTAMP'))
            .notNullable()
        ;

    });
}

export async function down(Knex: Knex){
    Knex.schema.dropTable('connections');
}