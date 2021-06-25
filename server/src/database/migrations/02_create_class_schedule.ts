import Knex from 'knex';

//Quais alterações a gente quer no BD
export async function up(Knex: Knex){
    return Knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();
        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();
        
        //Relacionamento - chave estrangeira
        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            
            //caso um professor seja deletado, as aulas também são
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        ;

    });
}

export async function down(Knex: Knex){
    Knex.schema.dropTable('class_schedule');
}