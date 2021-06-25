import knex from 'knex';
import path from 'path';

//Migrations - controlam a versão no banco de dados

const db = knex({
    client: "sqlite3",
    connection: {        
        filename: path.resolve(__dirname, 'database.sqlite')//cria um arquivo para armazenar os dados
    },
    useNullAsDefault: true, //Joga valor nulo para os campos que não foram preenchidos
})

export default db;